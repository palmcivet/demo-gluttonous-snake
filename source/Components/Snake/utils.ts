import { MAP } from "./config";

const arr2num = (argPos: number[]) => argPos[0] * MAP.BG_CELL + argPos[1];

const randPosition = (argArea: number[][] = []) => {
	let avoidArea = argArea.map((item) => arr2num(item));
	let rtnPos: number = Math.floor(Math.random() * (MAP.BG_LINE * MAP.BG_CELL));
	while (rtnPos in avoidArea) {
		rtnPos = Math.floor(Math.random() * (MAP.BG_LINE * MAP.BG_CELL));
	}
	console.log(rtnPos);

	return [Math.floor(rtnPos / MAP.BG_CELL), rtnPos % MAP.BG_CELL];
};

const randOrientation = () => Math.round(Math.random() * 4);

export { randPosition, randOrientation, arr2num };
