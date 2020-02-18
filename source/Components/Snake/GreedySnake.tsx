import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { creator as gameCreator, STATUS } from "../../Stores/game";
import { creator as controlCreator } from "../../Stores/control";
import { dirOrien, mapView } from "../../Config/reference";
import { arr2num, num2arr, randPosition } from "./utils";
import { Map } from "../../Containers/Screen/Map";
import { RootState } from "../../Stores";
import { MAP } from "./config";

interface IProps {
	dir: number;
	status: STATUS;
	overGame: any;
	getScore: any;
	initScore: any;
}

interface IState {
	food: number;
	head: number;
	body: number[];
}

class Snake extends Component<IProps, IState> {
	isPlaying: boolean = false;

	constructor(props: IProps) {
		super(props);

		this.state = {
			food: null,
			head: null,
			body: [],
		};
	}

	start = () => {
		// clean map
		let tHead = randPosition();
		let tFood = randPosition([tHead]);
		this.setState(
			{
				head: tHead,
				food: tFood,
				body: [tHead],
			},
			() => {
				this.props.initScore();
				this.isPlaying = true;
				this.loop(MAP.SPD_SNAKE);
			}
		);
	};

	next = (argHead = this.state.head) => {
		let rtnNext = num2arr(argHead);
		switch (this.props.dir) {
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
		if (
			rtnNext[0] < 0 ||
			rtnNext[1] < 0 ||
			rtnNext[0] >= MAP.BG_LINE ||
			rtnNext[1] >= MAP.BG_CELL
		) {
			if (!MAP.BOUNDARY) {
				// 循环边界
				rtnNext[0] = (MAP.BG_LINE + rtnNext[0]) % MAP.BG_LINE;
				rtnNext[1] = (MAP.BG_CELL + rtnNext[1]) % MAP.BG_CELL;
			} else {
				// 固定边界
				return -1;
			}
		}
		return arr2num(rtnNext);
	};

	handleMove = () => {
		let tHead = this.next(this.state.head);

		if (tHead in this.state.body || tHead === -1) {
			console.log("Game Over.");
			this.isPlaying = false;
			this.props.overGame();
		} else if (tHead === this.state.food) {
			// 有食物
			this.setState({
				head: tHead,
				food: randPosition(this.state.body),
			});
			this.state.body.reverse();
			this.state.body.push(tHead);
			this.state.body.reverse();
			this.props.getScore();
		} else {
			// 无食物
			this.setState({
				head: tHead,
			});
			this.state.body.reverse();
			this.state.body.push(tHead);
			this.state.body.reverse();
			this.state.body.pop();
		}
	};

	loop = (argTime: number) => {
		let startTime = new Date().getTime();
		let restTime = 0;

		if (this.isPlaying) {
			this.handleMove();
			restTime = argTime + startTime - new Date().getTime();
			setTimeout(() => this.loop(argTime), restTime);
		}
	};

	componentDidUpdate(prevProps: IProps) {
		if (prevProps.status === STATUS.RESTING && this.props.status === STATUS.PLAYING) {
			this.start();
		} else if (
			prevProps.status === STATUS.PLAYING &&
			this.props.status === STATUS.PAUSING
		) {
			this.isPlaying = false;
		} else if (
			prevProps.status === STATUS.PAUSING &&
			this.props.status === STATUS.PLAYING
		) {
			this.isPlaying = true;
			this.loop(MAP.SPD_SNAKE);
		}
	}

	render() {
		let map: Array<number> = [];
		map[MAP.BG_CELL * MAP.BG_LINE - 1] = mapView.empty;
		map.fill(mapView.empty);
		for (let index = 0; index < this.state.body.length; index++) {
			map[this.state.body[index]] = mapView.block;
		}
		map[this.state.food] = mapView.twinkle;
		return <Map table={map} />;
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		dir: state.control.dir,
		status: state.game.status,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return {
		...bindActionCreators(gameCreator, dispatch),
		...bindActionCreators(controlCreator, dispatch),
	};
};

const GreedySnake = connect(mapStateToProps, mapDispatchToProps)(Snake);

export { GreedySnake };
