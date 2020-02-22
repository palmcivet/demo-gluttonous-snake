import React from "react";
import { Info } from "./Info/index";
import { Snake } from "../../Component/Snake/index";
import "./style.less";

const Screen = () => {
	return (
		<div className="screen">
			<Snake />
			<Info />
		</div>
	);
};

export { Screen };
