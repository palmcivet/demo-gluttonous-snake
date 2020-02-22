import React, { Component } from "react";
import { GAME } from "../../../Config/reference";
import { Number } from "../../../Component/Number";
const robot = require("../../../../static/img/robot.png");
import "./style.less";

interface IProps {
	time?: number;
	curr_score?: number;
	best_score?: number;
	mode?: GAME;
}

const Info = (props: IProps) => {
	return (
		<div className="screen-info">
			<div className="score">
				<label>Score</label>
				<Number value={7289} />
			</div>
			<div className="mode">
				<Number value={3} />
			</div>
			<div className="next"></div>
			<div className="set">
				<img className="robot" src={robot.default}></img>
				<div className="bg music"></div>
				<div className="bg pause"></div>
			</div>
			<div className="time">
				<Number value={3423} clock />
			</div>
		</div>
	);
};

export { Info };
