import { i18n, dirOrien } from "../Config/reference";

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

interface IAction {
	type: ACTION_TYPES;
	map?: [];
}

interface IState {
	type: ACTION_TYPES.OVER;
	status: STATUS.RESTING;
	game: null; // 当前的游戏
	mark: 0; // 游戏分数
	map?: []; // 逻辑地图
	dir?: dirOrien;
}

const initState: IState = {
	type: ACTION_TYPES.OVER,
	status: STATUS.RESTING,
	game: null,
	mark: 0,
	map: [],
	dir: dirOrien.D,
};

const creator = {
	update: (map: number[]) => ({
		type: ACTION_TYPES.UPDATE,
		map: map,
	}),
	startGame: (): IAction => {
		document.title = i18n.cn.title_play;
		return {
			type: ACTION_TYPES.START,
		};
	},
	pauseGame: (): IAction => {
		document.title = i18n.cn.title_pause;
		return {
			type: ACTION_TYPES.PAUSE,
		};
	},
	overGame: (): IAction => {
		document.title = i18n.cn.title_pause;
		return {
			type: ACTION_TYPES.OVER,
		};
	},
};

const reducer = (state = initState, action: IAction) => {
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
