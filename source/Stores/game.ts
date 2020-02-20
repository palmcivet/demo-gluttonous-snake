import { STATUS, GAME } from "../Config/reference";
import { randOrientation } from "../Components/Snake/utils";

enum ACTION_TYPES {
	CHANGE = "GAME/CHANGE",
	SCORE_GET = "GAME/SCORE_GET",
	SCORE_INIT = "GAME/SCORE_INIT",
}

interface IAction {
	type: ACTION_TYPES;
	game?: GAME; // 当前的游戏
}

interface IState {
	type: ACTION_TYPES;
	game: null;
	score: number;
}

const initState: IState = {
	type: null,
	game: null,
	score: 0,
};

const creator = {
	changeGame: (argGame: GAME): IAction => {
		return {
			type: ACTION_TYPES.CHANGE,
			game: argGame,
		};
	},
	getScore: (): IAction => {
		return {
			type: ACTION_TYPES.SCORE_GET,
		};
	},
	initScore: (): IAction => {
		return {
			type: ACTION_TYPES.SCORE_INIT,
		};
	},
};

const reducer = (state = initState, action: IAction) => {
	switch (action.type) {
		case ACTION_TYPES.CHANGE:
			return {
				...state,
				game: action.game,
			};

		case ACTION_TYPES.SCORE_GET:
			return {
				...state,
				score: state.score + 1,
			};
		case ACTION_TYPES.SCORE_INIT:
			return {
				...state,
				dir: randOrientation(),
				score: 0,
			};
		default:
			return state;
	}
};

export { STATUS, creator, reducer };
