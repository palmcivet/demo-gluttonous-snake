import { MAP } from "../Components/Snake/config";

const genTable = (argCell = "") => {
	let rtnTable = new Array();
	for (let i = 0; i < MAP.BG_LINE; i++) {
		rtnTable[i] = new Array();
		for (let j = 0; j < MAP.BG_CELL; j++) {
			rtnTable[i][j] = argCell;
		}
	}
	return rtnTable;
};

export { genTable };
