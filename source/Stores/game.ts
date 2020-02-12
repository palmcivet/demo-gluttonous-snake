import { i18n } from "../Config/reference";

enum STATUS {
	RESTING,
	PLAYING,
	PAUSING,
}

enum GAME_TYPES {
	START = "GAME/START",
	PAUSE = "GAME/PAUSE",
	OVER = "GAME/OVER",
	UPDATE = "GAME/UPDATE",
}

interface Action {
	type: GAME_TYPES;
	map?: [];
}

const initState = {
	type: GAME_TYPES.OVER,
	status: STATUS.RESTING,
	map: [],
};

const creator = {
	update: (map) => ({
		type: GAME_TYPES.UPDATE,
		map: map,
	}),
	startGame: (): Action => {
		document.title = i18n.cn.title_play;
		return {
			type: GAME_TYPES.START,
		};
	},
	pauseGame: (): Action => {
		document.title = i18n.cn.title_pause;
		return {
			type: GAME_TYPES.PAUSE,
		};
	},
	overGame: (): Action => {
		document.title = i18n.cn.title_pause;
		return {
			type: GAME_TYPES.OVER,
		};
	},
};

const reducer = (state = initState, action: Action) => {
	switch (action.type) {
		case GAME_TYPES.START:
			return {
				...state,
				type: action.type,
			};
		case GAME_TYPES.PAUSE:
			return {
				...state,
				type: action.type,
			};
		case GAME_TYPES.OVER:
			return {
				...state,
				type: action.type,
			};
		case GAME_TYPES.OVER:
			return {
				...state,
				type: action.type,
				map: action.map,
			};
		default:
			return state;
	}
};

export { creator, reducer };
