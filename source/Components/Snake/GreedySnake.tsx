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
	head?: number;
	body: number[];
}

class Snake extends Component<IProps, IState> {
	food: number = null;
	head: number = null;
	tail: number = null;
	axis: boolean = false;
	isPlaying: boolean = false;

	constructor(props: IProps) {
		super(props);
		this.state = {
			body: [],
		};
	}

	start = () => {
		// clean map
		this.food = randPosition([this.head]);
		this.head = randPosition();
		this.tail = this.head;
		this.axis = false;
		this.setState(
			{
				head: this.head,
				body: [],
			},
			() => {
				this.props.initScore();
				this.isPlaying = true;
				this.loop(MAP.SPD_SNAKE);
			}
		);
	};

	next = (argHead = this.head) => {
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

		if (
			rtnNext[0] < 0 ||
			rtnNext[1] < 0 ||
			rtnNext[0] >= MAP.BG_LINE ||
			rtnNext[1] >= MAP.BG_CELL
		) {
			if (!MAP.IS_BOUNDARY) {
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
		if (this.axis) {
			let tHead = this.head;
			let tTail = this.tail;
			this.state.body.reverse();
			this.head = tTail;
			this.tail = tHead;
			this.axis = !this.axis;
		}

		let tHead = this.next(this.head);
		if (this.head === -1) {
			this.isPlaying = false;
			this.props.overGame();
		} else if (!MAP.IS_SELF && this.state.body.indexOf(this.head) !== -1) {
			this.isPlaying = false;
			this.props.overGame();
			console.log(this.head, this.state.body);
		} else if (this.head === this.food) {
			// 有食物
			this.state.body.reverse();
			this.state.body.push(this.head);
			this.state.body.reverse();
			this.props.getScore();
			this.head = tHead;
			this.food = randPosition(this.state.body);
			this.forceUpdate();
		} else {
			// 无食物
			this.state.body.reverse();
			this.state.body.push(this.head);
			this.state.body.reverse();
			this.head = tHead;
			this.tail = this.state.body.pop();
		}

		this.setState({
			head: this.head,
		});
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
		if (
			((prevProps.dir === dirOrien.U && this.props.dir === dirOrien.D) ||
				(prevProps.dir === dirOrien.D && this.props.dir === dirOrien.U) ||
				(prevProps.dir === dirOrien.L && this.props.dir === dirOrien.R) ||
				(prevProps.dir === dirOrien.R && this.props.dir === dirOrien.L)) &&
			this.state.body.length > 0
		) {
			this.axis = true;
		}

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
		map[this.head] = mapView.block;
		map[this.food] = mapView.twinkle;
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
