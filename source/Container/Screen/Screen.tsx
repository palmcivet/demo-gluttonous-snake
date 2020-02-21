import React from "react";
import { Info } from "./Info";
import "./index.less";
import { Snake } from "../../Component/Snake/index";

const Screen = () => {
	return (
		<div className="screen">
			<Snake />
			<Info />
		</div>
	);
};

export { Screen };
