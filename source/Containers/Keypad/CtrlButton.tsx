import React, { Component } from "react";

const Indicator = () => (
	<>
		<div className="t">
			<span aria-hidden="true" className="fa fa-caret-up"></span>
		</div>
		<div className="l">
			<span aria-hidden="true" className="fa fa-caret-left"></span>
		</div>
		<div className="r">
			<span aria-hidden="true" className="fa fa-caret-right"></span>
		</div>
		<div className="b">
			<span aria-hidden="true" className="fa fa-caret-down"></span>
		</div>
	</>
);

const CtrlButton = (props: { callback: Function }) => {
	return (
		<div className="btns control">
			<div className="up">
				<button className="btn ctrl" onClick={() => props.callback("W")}></button>
			</div>

			<div className="left">
				<button className="btn ctrl" onClick={() => props.callback("A")}></button>
			</div>

			<div className="icon">
				<Indicator />
			</div>

			<div className="right">
				<button className="btn ctrl" onClick={() => props.callback("D")}></button>
			</div>

			<div className="down">
				<button className="btn ctrl" onClick={() => props.callback("S")}></button>
			</div>
		</div>
	);
};

export { CtrlButton };
