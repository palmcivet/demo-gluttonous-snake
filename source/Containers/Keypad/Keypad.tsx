import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { creator as gameCreator, STATUS } from "../../Stores/game";
import { creator as controlCreator } from "../../Stores/control";
import { dirOrien } from "../../Config/reference";
import { ShiftButton } from "./ShiftButton";
import { CtrlButton } from "./CtrlButton";
import { SetButton } from "./SetButton";
import { RootState } from "../../Stores";
import "./index.less";

interface IProps {
	shift: any;
	changeDir: any;
	startGame: any;
	pauseGame: any;
	toogleMusic: any;
	status: STATUS;
}

class KeypadView extends Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}

	handleStart = () => {
		if (this.props.status === STATUS.RESTING) {
			this.props.startGame();
		}
	};

	handlePause = () => {
		this.props.pauseGame();
	};

	handleRestart = () => {
		// TODO
		this.props.startGame();
	};

	handleMusic = () => {
		this.props.toogleMusic();
	};

	handleKeyboard = (argDir: string) => {
		if (argDir == "ArrowUp" || argDir == "w" || argDir == "W") {
			this.props.changeDir(dirOrien.U);
		} else if (argDir == "ArrowDown" || argDir == "s" || argDir == "S") {
			this.props.changeDir(dirOrien.D);
		} else if (argDir == "ArrowLeft" || argDir == "a" || argDir == "A") {
			this.props.changeDir(dirOrien.L);
		} else if (argDir == "ArrowRight" || argDir == "d" || argDir == "D") {
			this.props.changeDir(dirOrien.R);
		} else {
			// TODO
			console.log("使用 上下左右键或 WASD");
		}
	};

	componentDidMount() {
		window.addEventListener("keydown", (e) => this.handleKeyboard(e.key));
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", (e) => this.handleKeyboard(e.key));
	}

	render() {
		return (
			<div className="keypad">
				<CtrlButton callback={this.handleKeyboard} />
				<ShiftButton callback={this.props.shift} />
				<SetButton
					start={() => this.handleStart}
					pause={() => this.handlePause}
					restart={() => this.handleRestart}
					music={() => this.handleMusic}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		status: state.game.status,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return {
		...bindActionCreators(gameCreator, dispatch),
		...bindActionCreators(controlCreator, dispatch),
	};
};

const Keypad = connect(mapStateToProps, mapDispatchToProps)(KeypadView);

export { Keypad };
