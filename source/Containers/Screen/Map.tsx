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
				if (items === mapView.block) {
					style = mapStyle.block;
				} else if (items === mapView.twinkle) {
					// style = mapStyle.twinkle;
					style = mapStyle.block;
				}
				return <div className={style} key={index} id={index.toString()}></div>;
			})}
		</div>
	);
};

export { Map };
