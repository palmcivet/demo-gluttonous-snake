import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dirOrien } from "../../Config/reference";

import { creator as gameCreator } from "../../Stores/game";
import { ShiftButton } from "./ShiftButton";
import { CtrlButton } from "./CtrlButton";
import { SetButton } from "./SetButton";
import "./index.less";

interface IProps {
	dir: dirOrien;
	mark?: number;
	isPlaying: boolean;
}

class KeypadView extends Component {
	constructor(props: IProps) {
		super(props);
	}

	handleStart() {
		//dispatch
	}

	handleKeyboard = (argDir) => {
		if (argDir == "ArrowUp" || argDir == "w" || argDir == "W") {
			argSnake.turn(dirOrien.U);
		} else if (argDir == "ArrowDown" || argDir == "s" || argDir == "S") {
			argSnake.turn(dirOrien.D);
		} else if (argDir == "ArrowLeft" || argDir == "a" || argDir == "A") {
			argSnake.turn(dirOrien.L);
		} else if (argDir == "ArrowRight" || argDir == "d" || argDir == "D") {
			argSnake.turn(dirOrien.R);
		} else {
			// TODO
			console.log("使用 上下左右键或 WASD");
		}
	};

	componentDidMount() {
		window.addEventListener("keydown", (e) =>
			this.handleKeyboard(this.player, e.key)
		);
	}
	componentWillUnmount() {
		window.removeEventListener("keydown", (e) =>
			this.handleKeyboard(this.player, e.key)
		);
	}

	render() {
		return (
			<div className="keypad">
				<CtrlButton />
				<ShiftButton />
				<SetButton />
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators(gameCreator, dispatch),
	};
};

const Keypad = connect(mapStateToProps, mapDispatchToProps)(KeypadView);

export { Keypad };
