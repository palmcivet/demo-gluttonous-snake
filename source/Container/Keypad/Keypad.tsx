import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";

import { creator as controlCreator } from "../../Store/control";
import { creator as gameCreator } from "../../Store/game";
import { dirOrien } from "../../Config/reference";
import { ShiftButton } from "./ShiftButton";
import { CtrlButton } from "./CtrlButton";
import { SetButton } from "./SetButton";
import { rootState } from "../../Store/index";
import "./index.less";

interface IProps {
	navigate: any;
	shift: any;
	start: any;
	pause: any;
	restart: any;
	music: any;
}

class KeypadView extends Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}

	handleKeyboard = (argDir: string) => {
		if (argDir == "ArrowUp" || argDir == "w" || argDir == "W") {
			this.props.navigate(dirOrien.U);
		} else if (argDir == "ArrowDown" || argDir == "s" || argDir == "S") {
			this.props.navigate(dirOrien.D);
		} else if (argDir == "ArrowLeft" || argDir == "a" || argDir == "A") {
			this.props.navigate(dirOrien.L);
		} else if (argDir == "ArrowRight" || argDir == "d" || argDir == "D") {
			this.props.navigate(dirOrien.R);
		} else if (argDir == "Enter") {
			this.props.start();
		} else if (argDir == "Space") {
			this.props.shift();
		} else {
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
				<ShiftButton callback={() => this.props.shift} />
				<SetButton
					start={() => this.props.start}
					pause={() => this.props.pause}
					restart={() => this.props.restart}
					music={() => this.props.music}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: rootState) => {
	return {};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return {
		...bindActionCreators(gameCreator, dispatch),
		...bindActionCreators(controlCreator, dispatch),
	};
};

const Keypad = connect(mapStateToProps, mapDispatchToProps)(KeypadView);

export { Keypad };
