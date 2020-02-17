import React from "react";

import { mapView, mapStyle } from "../../Config/reference";

interface IProps {
	table: number[];
}

const Map = (props: IProps) => {
	return (
		<div className="screen-map">
			{props.table.map((items, index) => {
				let style = mapStyle.empty;
				switch (items) {
					case mapView.empty:
						style = mapStyle.empty;
						break;
					case mapView.block:
						style = mapStyle.block;
						break;
					case mapView.twinkle:
						style = mapStyle.twinkle;
						break;
				}
				return <div className={style} key={index}></div>;
			})}
		</div>
	);
};

export { Map };
