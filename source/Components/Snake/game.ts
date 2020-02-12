import { Snake } from "./snake";
import { MAP } from "./config";
import { dirOrien } from "../../Config/reference";
import { randPosition, arr2num } from "./utils";
import { creator } from "../../Stores/game";

/**
 * @class 描述一局游戏
 */
class Game {
	player: Snake;
	isPlaying: boolean;
	food: number;
	mark: number;

	constructor() {
		this.player = new Snake();
		this.isPlaying = false;
		window.addEventListener("keydown", (e) => {
			this.handleKeyboard(this.player, e.key);
		});
	}

	start = () => {
		this.isPlaying = true;
		this.player.init();
		this.mark = 0;
		this.cleanMap();
		this.generateFood();
		console.log("start", this.player.head);
		// window.addEventListener("keydown", (e) =>
		// 	this.handleKeyboard(this.player, e.key)
		// );
		this.loop(MAP.SPD_SNAKE);
	};

	private gameOver = () => {
		this.isPlaying = false;
		window.removeEventListener("keydown", (e) =>
			this.handleKeyboard(this.player, e.key)
		);
		console.info("Game Over.");
		// alert("Game Over");
	};

	private generateFood = () => {
		this.food = arr2num(randPosition(this.player.body));
	};

	private handleMove = (argSnake: Snake) => {
		if (argSnake.head === [null, null]) {
			this.gameOver();
		} else if (argSnake.head == [0, 0]) {
			argSnake.move();
			console.log("C2");
			// } else if (arr2num(argSnake.head) in argSnake.body.map((item) => arr2num(item))) {
			// 	console.log("C1");
			// 	this.gameOver();
		} else if (arr2num(argSnake.head) === this.food) {
			// 有食物
			argSnake.catch();
			this.mark += 1;
			this.generateFood();
		} else {
			// 无食物
			argSnake.move();
		}
	};

	private handleKeyboard = (argSnake: Snake, argDir: string) => {
		if (argDir == "ArrowUp" || argDir == "w" || argDir == "W") {
			argSnake.turn(dirOrien.U);
		} else if (argDir == "ArrowDown" || argDir == "s" || argDir == "S") {
			argSnake.turn(dirOrien.D);
		} else if (argDir == "ArrowLeft" || argDir == "a" || argDir == "A") {
			argSnake.turn(dirOrien.L);
		} else if (argDir == "ArrowRight" || argDir == "d" || argDir == "D") {
			argSnake.turn(dirOrien.R);
		} else {
			// TODO
			console.log("使用 上下左右键或 WASD");
		}
	};

	private cleanMap = () => {};

	private refreshMap = () => {
		let snakeMap = this.player.body.map((item) => arr2num(item));
		console.table(snakeMap);

		for (let cell = 0; cell < MAP.BG_CELL * MAP.BG_LINE; cell++) {
			for (let snake = 0; snake < snakeMap.length; snake++) {
				// console.log(snake);
				if (cell == snakeMap[snake]) {
					document.getElementById(cell.toString()).className = "cell-block";
				} else if (cell === this.food) {
					document.getElementById(cell.toString()).className = "cell-block";
					// document.getElementById(cell.toString()).className = "cell-twinkle";
				} else {
					document.getElementById(cell.toString()).className = "cell-map";
				}
			}
		}
	};

	private loop = (argTime: number) => {
		let startTime = new Date().getTime();
		let restTime = 0;
		if (this.isPlaying) {
			this.handleMove(this.player);
			this.refreshMap();
			restTime = argTime + startTime - new Date().getTime();
			setTimeout(() => this.loop(argTime), restTime);
		}
	};
}

export { Game };
