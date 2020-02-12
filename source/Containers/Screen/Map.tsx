import React, { Fragment } from "react";

import { genTable } from "../../Components/Snake/table";
import { MAP } from "../../Components/Snake/config";

let mapTable = genTable();
let id = 0;

const Map = (props) => {
	return (
		<div className="screen-map">
			{mapTable.map((items, line) => (
				<Fragment key={line}>
					{items.map((item, cell) => (
						<div
							className="cell-map"
							key={cell}
							id={(id++).toString()}
							style={{ backgroundColor: MAP.BG_STYLE }}
						></div>
					))}
				</Fragment>
			))}
		</div>
	);
};

export { Map };
