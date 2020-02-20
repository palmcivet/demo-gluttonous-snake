import React from "react";

const ShiftButton = (props: { callback: Function }) => (
	<div className="btns shift">
		<button className="btn shift" onClick={props.callback()}></button>
		<div>Shift</div>
	</div>
);

export { ShiftButton };
