import { i18n, STATUS, GAME } from "../Config/reference";
import { dirOrien } from "../Config/reference";
import { Dispatch } from "redux";

enum ACTION_TYPES {
	NAVIGATE = "CONTROL/NAVIGATE",
	SHIFT = "CONTROL/SHIFT",
	START = "CONTROL/START",
	PAUSE = "CONTROL/PAUSE",
	RESTART = "CONTROL/RESTART",
	MUSIC = "CONTROL/MUSIC",
	FINISH = "GAME/FINISH", // 独立于 control 模块
}

interface IAction {
	type: ACTION_TYPES;
	dir?: dirOrien;
}

interface IState {
	type: ACTION_TYPES;
	status: STATUS;
	music: boolean;
	dir: dirOrien;
}

const initState: IState = {
	type: null,
	status: STATUS.RESTING,
	music: true,
	dir: null,
};

const creator = {
	navigate: (argDir: dirOrien): IAction => {
		return {
			type: ACTION_TYPES.NAVIGATE,
			dir: argDir,
		};
	},
	shift: (): IAction => {
		return {
			type: ACTION_TYPES.SHIFT,
		};
	},
	start: (): IAction => {
		return {
			type: ACTION_TYPES.START,
		};
	},
	pause: (): IAction => {
		return {
			type: ACTION_TYPES.PAUSE,
		};
	},
	restart: () => {
		return (dispatch: Dispatch) => {
			dispatch(creator.finish());
			dispatch(creator.start());
		};
	},
	music: (): IAction => {
		return {
			type: ACTION_TYPES.MUSIC,
		};
	},
	finish: (): IAction => {
		return {
			type: ACTION_TYPES.FINISH,
		};
	},
};

const reducer = (state = initState, action: IAction) => {
	switch (action.type) {
		case ACTION_TYPES.NAVIGATE:
			return {
				...state,
				dir: action.dir,
			};
		case ACTION_TYPES.SHIFT:
			return {
				...state,
			};
		case ACTION_TYPES.START:
			if (state.status === STATUS.RESTING) {
				document.title = i18n.cn.title_play;
				return {
					...state,
					status: STATUS.PLAYING,
				};
			}
		case ACTION_TYPES.PAUSE:
			if (state.status === STATUS.PLAYING) {
				document.title = i18n.cn.title_pause;
				return {
					...state,
					status: STATUS.PAUSING,
				};
			} else if (state.status === STATUS.PAUSING) {
				document.title = i18n.cn.title_play;
				return {
					...state,
					status: STATUS.PLAYING,
				};
			}
		case ACTION_TYPES.RESTART:
			if (state.status === STATUS.PLAYING) {
				document.title = i18n.cn.title_pause;
				return {
					...state,
					status: STATUS.PLAYING,
				};
			}
		case ACTION_TYPES.MUSIC:
			return {
				...state,
				music: !state.music,
			};
		case ACTION_TYPES.FINISH:
			document.title = i18n.cn.title_raw;

			return {
				...state,
				status: STATUS.RESTING,
			};
		default:
			return state;
	}
};

export { creator, reducer };
