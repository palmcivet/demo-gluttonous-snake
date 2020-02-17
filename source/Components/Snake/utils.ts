import { MAP } from "./config";

const arr2num = (argPos: number[]) => argPos[0] * MAP.BG_CELL + argPos[1];
const num2arr = (argPos: number) => [argPos / MAP.BG_CELL, argPos % MAP.BG_CELL];

const randPosition = (argArea: number[] = []) => {
	let rtnPos = Math.floor(Math.random() * (MAP.BG_LINE * MAP.BG_CELL));
	while (rtnPos in argArea) {
		rtnPos = Math.floor(Math.random() * (MAP.BG_LINE * MAP.BG_CELL));
	}
	return rtnPos;
};

const randOrientation = () => Math.round(Math.random() * 4);

export { arr2num, num2arr, randPosition, randOrientation };
