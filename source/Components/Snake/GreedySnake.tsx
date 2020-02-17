import React, { Component } from "react";

import { MAP } from "./config";
import { creator } from "../../Stores/game";
import { arr2num, num2arr, randPosition, randOrientation } from "./utils";
import { Map } from "../../Containers/Screen/Map";
import { dirOrien, mapStyle } from "../../Config/reference";

interface IProps {
	dir: dirOrien;
	mark?: number;
	isPlaying: boolean;
}

interface IState {
	dir: dirOrien;
	food: number;
	head: number;
	body: number[];
	isPlaying: boolean;
}

class GreedySnake extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			dir: randOrientation(),
			food: randPosition(),
			head: randPosition(),
			body: [this.state.head],
			isPlaying: false,
		};
	}

	start = () => {
		// dispatch
		this.setState({
			dir: randOrientation(),
			head: randPosition(),
			food: randPosition(this.state.body),
			body: [this.state.head],
			isPlaying: true,
		});

		// clean map
		console.log("start");
		this.loop(MAP.SPD_SNAKE);
	};

	private next = (argHead = this.state.head) => {
		let rtnNext = num2arr(argHead);
		switch (this.state.dir) {
			case dirOrien.U:
				rtnNext[0] = rtnNext[0] - 1;
				break;
			case dirOrien.D:
				rtnNext[0] = rtnNext[0] + 1;
				break;
			case dirOrien.L:
				rtnNext[1] = rtnNext[1] - 1;
				break;
			case dirOrien.R:
				rtnNext[1] = rtnNext[1] + 1;
				break;
		}

		// 边界检测，失败返回 "ERROR"，成功返回坐标数组
		if (!MAP.BOUNDARY) {
			// 循环边界
			rtnNext[0] = (MAP.BG_LINE + rtnNext[0]) % MAP.BG_LINE;
			rtnNext[1] = (MAP.BG_CELL + rtnNext[1]) % MAP.BG_CELL;
		} else {
			// 固定边界
			if (
				rtnNext[0] < 0 ||
				rtnNext[1] < 0 ||
				rtnNext[0] >= MAP.BG_LINE ||
				rtnNext[1] >= MAP.BG_CELL
			) {
				return -1;
			}
		}
		return arr2num(rtnNext);
	};

	private move = () => {
		this.setState({
			head: this.next(this.state.head),
		});
		this.state.body.reverse();
		this.state.body.push(this.state.head);
		this.state.body.reverse();
		return this.state.body.pop();
	};

	private catch = () => {
		this.setState({
			head: this.next(this.state.head),
		});
		this.state.body.reverse();
		this.state.body.push(this.state.head);
		this.state.body.reverse();
		return this.state.head;
	};

	private handleDie = () => {
		this.setState({
			isPlaying: false,
		});
		console.info("Game Over.");
	};

	private handleMove = () => {
		if (this.state.head === -1) {
			this.handleDie();
		} else if (this.state.head == 0) {
			this.move();
		} else if (this.state.head === this.state.food) {
			// 有食物
			this.catch();
			this.setState({
				food: randPosition(this.state.body),
			});
		} else {
			// 无食物
			this.move();
		}
	};

	private loop = (argTime: number) => {
		let startTime = new Date().getTime();
		let restTime = 0;
		if (this.state.isPlaying) {
			this.handleMove();
			restTime = argTime + startTime - new Date().getTime();
			setTimeout(() => this.loop(argTime), restTime);
		}
	};

	componentDidUpdate(prevProps: IProps) {
		if (!prevProps.isPlaying && this.state.isPlaying) {
			this.loop(MAP.SPD_REFRESH);
		}
	}

	render() {
		let map: mapStyle[] = [];
		map[MAP.BG_CELL * MAP.BG_LINE] = mapStyle.empty;
		map.fill(mapStyle.empty);

		for (let index = 0; index < this.state.body.length; index++) {
			map[this.state.body[index]] = mapStyle.block;
		}
		map[this.state.food] = mapStyle.twinkle;
		return <Map table={this.state.body} />;
	}
}

export { GreedySnake };
