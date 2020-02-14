import { i18n } from "../Config/reference";

enum STATUS {
	RESTING,
	PLAYING,
	PAUSING,
}

enum ACTION_TYPES {
	START = "GAME/START",
	PAUSE = "GAME/PAUSE",
	OVER = "GAME/OVER",
	UPDATE = "GAME/UPDATE",
}

interface Action {
	type: ACTION_TYPES;
	map?: [];
}

const initState = {
	type: ACTION_TYPES.OVER,
	status: STATUS.RESTING,
	game: null, // 当前的游戏
	instance: null, // 游戏实例
	mark: 0, // 游戏分数
	timer: 0, // 返回的定时器
	map: [], // 逻辑地图
};

const creator = {
	update: (map) => ({
		type: ACTION_TYPES.UPDATE,
		map: map,
	}),
	startGame: (): Action => {
		document.title = i18n.cn.title_play;
		return {
			type: ACTION_TYPES.START,
		};
	},
	pauseGame: (): Action => {
		document.title = i18n.cn.title_pause;
		return {
			type: ACTION_TYPES.PAUSE,
		};
	},
	overGame: (): Action => {
		document.title = i18n.cn.title_pause;
		return {
			type: ACTION_TYPES.OVER,
		};
	},
};

const reducer = (state = initState, action: Action) => {
	switch (action.type) {
		case ACTION_TYPES.START:
			return {
				...state,
				type: action.type,
			};
		case ACTION_TYPES.PAUSE:
			return {
				...state,
				type: action.type,
			};
		case ACTION_TYPES.OVER:
			return {
				...state,
				type: action.type,
			};
		case ACTION_TYPES.OVER:
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
