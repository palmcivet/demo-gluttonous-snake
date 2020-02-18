import React from "react";

interface IProps {
	start: Function;
	pause: Function;
	restart: Function;
	music: Function;
}

const SetButton = (props: IProps) => {
	return (
		<div className="btns setting">
			<div>
				<button className="btn set" onClick={props.start()}></button>
				<div>Start</div>
			</div>

			<div>
				<button className="btn set" onClick={props.pause()}></button>
				<div>Pause</div>
			</div>

			<div>
				<button className="btn set" onClick={props.restart()}></button>
				<div>Restart</div>
			</div>

			<div>
				<button className="btn set" onClick={props.music()}></button>
				<div>Music</div>
			</div>
		</div>
	);
};

export { SetButton };
