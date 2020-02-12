import React, { Component } from "react";

const SetButtonView = (props) => {
	return (
		<button className="btn set">
			<span className={props.className}></span>
		</button>
	);
};

const SetButton = (props) => {
	return (
		<div className="btns setting">
			<div>
				<button className="btn set" onClick={() => this.handleStart()}></button>
				<div>Start</div>
			</div>

			<div>
				<button className="btn set" onClick={() => this.props.pauseGame}></button>
				<div>Pause</div>
			</div>

			<div>
				<button
					className="btn set"
					onClick={() => console.log("sdfsdf")}
				></button>
				<div>Restart</div>
			</div>

			<div>
				<button
					className="btn set"
					onClick={() => console.log("sdfsdf")}
				></button>
				<div>Music</div>
			</div>
		</div>
	);
};

export { SetButton };
