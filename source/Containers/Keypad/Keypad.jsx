import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { creator as gameCreator } from "../../Stores/game";
import { Game } from "../../Components/Snake/game";
import { CtrlButton } from "./CtrlButton";
import { SetButton } from "./SetButton";
import "./index.less";

const Shift = (props) => (
	<div className="btns shift">
		<button className="btn shift"></button>
		<div>Space</div>
	</div>
);

class KeypadView extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.game = new Game();
	}

	handleStart() {
		this.game.start();
		this.props.startGame();
	}

	render() {
		return (
			<div className="keypad">
				<CtrlButton />
				<Shift />
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
