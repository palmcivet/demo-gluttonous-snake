import { MAP } from "./config";
import { dirOrien } from "../../Config/reference";
import { randOrientation, randPosition } from "./utils";

class Snake {
	dir: dirOrien;
	head: number[];
	body: number[][] = [];

	init = () => {
		this.dir = randOrientation();
		this.head = randPosition();
		this.body[0] = this.head;
	};

	private next = (argHead = this.head) => {
		let rtnNext: number[] = argHead;
		rtnNext = Object.assign(rtnNext, argHead);

		switch (this.dir) {
			case dirOrien.U:
				rtnNext[0] = rtnNext[0] - 1;
				break;
			case dirOrien.D:
				rtnNext[0] = rtnNext[0] + 1;
				break;
			case dirOrien.L:
				rtnNext[1] = rtnNext[1] - 1;
				break;
			case dirOrien.R:
				rtnNext[1] = rtnNext[1] + 1;
				break;
		}

		// 边界检测，失败返回 "ERROR"，成功返回坐标数组
		if (!MAP.BOUNDARY) {
			// 循环边界
			rtnNext[0] = (MAP.BG_LINE + rtnNext[0]) % MAP.BG_LINE;
			rtnNext[1] = (MAP.BG_CELL + rtnNext[1]) % MAP.BG_CELL;
		} else {
			// 固定边界
			if (
				rtnNext[0] < 0 ||
				rtnNext[1] < 0 ||
				rtnNext[0] >= MAP.BG_LINE ||
				rtnNext[1] >= MAP.BG_CELL
			) {
				return [null, null];
			}
		}
		return rtnNext;
	};

	turn = (argChgDir: dirOrien) => {
		this.dir = argChgDir;
	};

	move = () => {
		this.head = this.next(this.head);
		this.body.reverse();
		this.body.push(this.head.slice(0));
		this.body.reverse();
		return this.body.pop();
	};

	catch = () => {
		this.head = this.next(this.head);
		this.body.reverse();
		this.body.push(this.head.slice(0));
		this.body.reverse();
		return this.head;
	};
}

export { Snake };
