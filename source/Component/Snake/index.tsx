import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { creator as gameCreator, STATUS } from "../../Store/game";
import { creator as controlCreator } from "../../Store/control";
import { dirOrien, mapView } from "../../Config/reference";
import { arr2num, num2arr, randPosition } from "./utils";
import { Map } from "../../Container/Screen/Map/index";
import { MAP, SNAKE } from "../../Config/config";
import { rootState } from "../../Store";

interface IProps {
	dir: number;
	status: STATUS;
	finish: any;
	getScore: any;
	initScore: any;
}

interface IState {
	head?: number;
	body: number[];
}

class SnakeView extends Component<IProps, IState> {
	food: number = null;
	head: number = null;
	tail: number = null;
	axis = false;
	isPlaying = false;

	constructor(props: IProps) {
		super(props);
		this.state = {
			head: null,
			body: [],
		};
	}

	start = () => {
		this.food = randPosition([this.head]);
		this.head = randPosition();
		this.tail = this.head;
		this.axis = false;
		this.isPlaying = true;
		this.setState(
			{
				head: this.head,
				body: [],
			},
			() => {
				this.props.initScore();
				this.loop(SNAKE.SPD_SNAKE);
			}
		);
	};

	finish = () => {
		this.props.finish();
		this.upRefresh();
		this.food = null;
		this.head = null;
		this.tail = null;
		this.isPlaying = false;
		this.setState({
			head: null,
			body: [],
		});
		setTimeout(this.downRefresh, MAP.BG_LINE * MAP.SPD_REFRESH);
	};

	upRefresh = () =>
		this.sleep(
			MAP.SPD_REFRESH,
			(i) => {
				let map = [];
				Array((i + 1) * MAP.BG_CELL)
					.fill(1)
					.map((k, j) => {
						map.push(j + (MAP.BG_LINE - i - 1) * MAP.BG_CELL);
					});
				this.setState({ body: map }, this.forceUpdate);
			},
			0,
			MAP.BG_LINE,
			1
		);

	downRefresh = () => {
		this.sleep(
			MAP.SPD_REFRESH,
			(i) => {
				let map = [];
				Array((MAP.BG_LINE - i - 1) * MAP.BG_CELL)
					.fill(1)
					.map((k, j) => {
						map.push(j + (i + 1) * MAP.BG_CELL);
					});
				this.setState({ body: map }, this.forceUpdate);
			},
			0,
			MAP.BG_LINE,
			1
		);
	};

	sleep = (
		argTime: number,
		callback: (i: number) => void,
		argStart: number,
		argEnd: number,
		argStep: number
	) => {
		let startTime = new Date().getTime();
		if (argStart < argEnd) {
			callback(argStart);
			let restTime = argTime + startTime - new Date().getTime();
			setTimeout(
				() => this.sleep(argTime, callback, argStart + argStep, argEnd, argStep),
				restTime
			);
		}
	};

	next = (argHead = this.head, argDir = this.props.dir) => {
		let rtnNext = num2arr(argHead);
		switch (argDir) {
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
			if (!SNAKE.IS_BOUNDARY) {
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
			let tTail = this.tail;
			let tHead = this.head;
			this.state.body.reverse();
			this.head = tTail;
			this.tail = tHead;
			this.axis = !this.axis;
		} else {
			let tHead = this.next(this.head);
			if (this.head === -1) {
				this.finish();
			} else if (!SNAKE.IS_SELF && this.state.body.indexOf(this.head) !== -1) {
				console.log(this.head, this.tail, this.state.body);
				this.finish();
			} else if (this.head === this.food) {
				// 有食物
				this.state.body.reverse();
				this.state.body.push(this.head);
				this.state.body.reverse();
				this.props.getScore();
				this.head = tHead;
				this.food = randPosition(this.state.body);
			} else {
				// 无食物
				this.state.body.reverse();
				this.state.body.push(this.head);
				this.state.body.reverse();
				this.head = tHead;
				this.tail = this.state.body.pop();
			}
		}

		this.setState({
			head: this.head,
		});
	};

	loop = (argTime: number, callback = this.handleMove) => {
		let startTime = new Date().getTime();
		let restTime = 0;
		if (this.isPlaying) {
			callback();
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
			this.loop(SNAKE.SPD_SNAKE);
		}
	}

	render() {
		let map = Array(MAP.BG_CELL * MAP.BG_LINE).fill(mapView.empty);
		for (let index = 0; index < this.state.body.length; index++) {
			map[this.state.body[index]] = mapView.block;
		}
		map[this.head] = mapView.block;
		map[this.food] = mapView.twinkle;
		return <Map table={map} />;
	}
}

const mapStateToProps = (state: rootState) => {
	return {
		dir: state.control.dir,
		status: state.control.status,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return {
		...bindActionCreators(gameCreator, dispatch),
		...bindActionCreators(controlCreator, dispatch),
	};
};

const Snake = connect(mapStateToProps, mapDispatchToProps)(SnakeView);

export { Snake };
