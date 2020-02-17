interface IMap {
	BG_LINE: number;
	BG_CELL: number;
	TURN_COLOR: number;
	SPD_SNAKE: number;
	SPD_REFRESH: number;
	FOOD_NUM: number;
	BOUNDARY: boolean;
}

const MAP: IMap = {
	BG_LINE: 22,
	BG_CELL: 12,
	TURN_COLOR: 0.5, // 蛇身体和头部计算差
	SPD_SNAKE: 600, // 移动速度
	SPD_REFRESH: 200, // 0.2s
	FOOD_NUM: 3, //食物数量
	BOUNDARY: false, // 是否存在边界
};

export { MAP };
