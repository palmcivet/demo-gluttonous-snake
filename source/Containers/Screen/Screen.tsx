import React, { Component } from "react";
import { Info } from "./Info";
import "./index.less";
import { GreedySnake } from "../../Components/Snake/GreedySnake";

const Screen = () => {
	return (
		<div className="screen">
			<GreedySnake />
			<Info />
		</div>
	);
};

export { Screen };
