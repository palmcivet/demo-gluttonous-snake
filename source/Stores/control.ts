import { dirOrien } from "../Config/reference";

enum ACTION_TYPES {
	CHANGE_DIR = "CONTROL/CHANGE_DIR",
	GET_SCORE = "CONTROL/GET_SCORE",
	SHIFT = "CONTROL/SHIFT",
}

interface IAction {
	type: ACTION_TYPES;
	dir?: dirOrien;
}

interface IState {
	type: ACTION_TYPES;
	score: number;
	dir?: dirOrien;
}

const initState: IState = {
	type: null,
	score: 0,
	dir: dirOrien.D,
};

const creator = {
	getScore: (): IAction => {
		return {
			type: ACTION_TYPES.GET_SCORE,
		};
	},
	changeDir: (argDir: dirOrien): IAction => {
		return {
			type: ACTION_TYPES.CHANGE_DIR,
			dir: argDir,
		};
	},
	shift: (): IAction => {
		return {
			type: ACTION_TYPES.SHIFT,
		};
	},
};

const reducer = (state = initState, action: IAction) => {
	switch (action.type) {
		case ACTION_TYPES.GET_SCORE:
			return {
				...state,
				dir: action.dir,
			};
		case ACTION_TYPES.GET_SCORE:
			return {
				...state,
				score: state.score++,
			};
		case ACTION_TYPES.SHIFT:
			return {
				...state,
			};
		default:
			return state;
	}
};

export { creator, reducer };
