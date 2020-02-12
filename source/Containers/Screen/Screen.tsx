import React, { Component } from "react";
import { Map } from "./Map";
import { Info } from "./Info";
import "./index.less";

const Screen = () => {
	return (
		<div className="screen">
			<Map />
			<Info />
		</div>
	);
};

export { Screen };
