import { MAP } from "../../Config/config";
import { dirOrien } from "../../Config/reference";

const arr2num = (argPos: number[]) => argPos[0] * MAP.BG_CELL + argPos[1];

const num2arr = (argPos: number) => [
	Math.floor(argPos / MAP.BG_CELL),
	argPos % MAP.BG_CELL,
];

const randPosition = (argArea: number[] = []) => {
	let rtnPos = Math.floor(Math.random() * MAP.BG_LINE * MAP.BG_CELL);
	while (rtnPos in argArea) {
		rtnPos = Math.floor(Math.random() * MAP.BG_LINE * MAP.BG_CELL);
	}
	return rtnPos;
};

const randOrientation = () => Math.round(Math.random() * 4);

const reverseDir = (argDir: dirOrien) => {
	switch (argDir) {
		case dirOrien.U:
			return dirOrien.D;
		case dirOrien.D:
			return dirOrien.U;
		case dirOrien.L:
			return dirOrien.R;
		case dirOrien.R:
			return dirOrien.L;
	}
};

const sleep = (
	argTime: number,
	callback: (i: number) => void,
	argStart: number,
	argEnd: number,
	argStep: number
) => {
	let startTime = new Date().getTime();
	let restTime = 0;
	if (argStart < argEnd) {
		callback(argStart);
		restTime = argTime + startTime - new Date().getTime();
		setTimeout(
			() => sleep(argTime, callback, argStart + argStep, argEnd, argStep),
			restTime
		);
	}
};

export { arr2num, num2arr, randPosition, randOrientation, reverseDir, sleep };
