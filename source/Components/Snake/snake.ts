import { MAP } from "./config";
import { dirOrien } from "../../Config/reference";
import { randOrientation, randPosition, num2arr, arr2num } from "./utils";

class Snake {
	dir: dirOrien = randOrientation();
	head: number = randPosition();
	body: number[] = [];

	init = () => {
		this.dir = randOrientation();
		this.head = randPosition();
		this.body.push(this.head);
	};

	next = (argHead = this.head) => {
		let rtnNext = num2arr(argHead);

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
				return -1;
			}
		}
		return arr2num(rtnNext);
	};

	move = () => {
		this.head = this.next(this.head);
		this.body.reverse();
		this.body.push(this.head);
		this.body.reverse();
		return this.body.pop();
	};

	catch = () => {
		this.head = this.next(this.head);
		this.body.reverse();
		this.body.push(this.head);
		this.body.reverse();
		return this.head;
	};
}

export { Snake };
