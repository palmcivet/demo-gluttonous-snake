import React, { Component } from "react";
import { GAME } from "../../Config/reference";
const robot = require("../../../static/img/robot.png");

interface IProps {
	time?: number;
	curr_score?: number;
	best_score?: number;
	mode?: GAME;
}

const Info = (props?: IProps) => {
	return (
		<div className="screen-info">
			<div className="score">
				<label>Score</label>
				<div className="number">
					<span className="bg s_n"></span>
					<span className="bg s_n"></span>
					<span className="bg s_n"></span>
					<span className="bg s_n"></span>
					<span className="bg s_n"></span>
					<span className="bg s_n"></span>
				</div>
			</div>
			<div className="mode"></div>
			<div className="next"></div>
			<div className="set"></div>
			<div className="time">
				<img src={robot.default}></img>
				<div className="number">
					<span className="bg s_n"></span>
					<span className="bg s_n"></span>
					<span className="bg s_n"></span>
					<span className="bg s_n"></span>
					<span className="bg s_n"></span>
				</div>
			</div>
		</div>
	);
};

export { Info };
