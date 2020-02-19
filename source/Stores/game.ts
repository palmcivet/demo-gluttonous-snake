import { i18n, dirOrien } from "../Config/reference";

enum STATUS {
	RESTING,
	PLAYING,
	PAUSING,
}

enum GAME {
	GREEDYSNAKE,
	TETRIS,
}

enum ACTION_TYPES {
	OVER = "GAME/OVER",
	START = "GAME/START",
	PAUSE = "GAME/PAUSE",
	MUSIC = "GAME/MUSIC",
	CHANGE = "GAME/CHANGE",
}

interface IAction {
	type: ACTION_TYPES;
	game?: GAME; // 当前的游戏
}

interface IState {
	type: ACTION_TYPES;
	status: STATUS;
	music: boolean;
	game: null;
}

const initState: IState = {
	type: null,
	status: STATUS.RESTING,
	music: true,
	game: null,
};

const creator = {
	startGame: (): IAction => {
		return {
			type: ACTION_TYPES.START,
		};
	},
	pauseGame: (): IAction => {
		return {
			type: ACTION_TYPES.PAUSE,
		};
	},
	overGame: (): IAction => {
		return {
			type: ACTION_TYPES.OVER,
		};
	},
	changeGame: (argGame: GAME): IAction => {
		return {
			type: ACTION_TYPES.CHANGE,
			game: argGame,
		};
	},
	toogleMusic: (): IAction => {
		return {
			type: ACTION_TYPES.MUSIC,
		};
	},
};

const reducer = (state = initState, action: IAction) => {
	switch (action.type) {
		case ACTION_TYPES.START:
			document.title = i18n.cn.title_play;
			return {
				...state,
				status: STATUS.PLAYING,
			};
		case ACTION_TYPES.PAUSE:
			if (state.status === STATUS.PAUSING) {
				document.title = i18n.cn.title_play;
				return {
					...state,
					status: STATUS.PLAYING,
				};
			} else if (state.status === STATUS.PLAYING) {
				document.title = i18n.cn.title_pause;
				return {
					...state,
					status: STATUS.PAUSING,
				};
			}
		case ACTION_TYPES.OVER:
			document.title = i18n.cn.title_raw;
			console.log("Over");
			return {
				...state,
				status: STATUS.RESTING,
			};
		case ACTION_TYPES.CHANGE:
			return {
				...state,
				game: action.game,
			};
		case ACTION_TYPES.MUSIC:
			return {
				...state,
				music: !state.music,
			};
		default:
			return state;
	}
};

export { STATUS, creator, reducer };
