import React from "react";
import { Keypad } from "./Keypad/Keypad";
import { Screen } from "./Screen/Screen";
import "./index.less";

const Console = () => {
	return (
		<div className="console">
			<div className="frame">
				<div className="decoration">
					<div className="chamfer">
						<Screen />
					</div>
				</div>
			</div>
			<div className="pannel">
				<Keypad />
			</div>
		</div>
	);
};

export { Console };
