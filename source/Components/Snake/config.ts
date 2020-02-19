interface IMap {
	BG_LINE: number;
	BG_CELL: number;
	SPD_SNAKE: number;
	IS_SELF: boolean;
	IS_BOUNDARY: boolean;
}

const MAP: IMap = {
	BG_LINE: 22,
	BG_CELL: 12,
	SPD_SNAKE: 400, // 移动速度
	IS_SELF: false, // 是否能撞到自身
	IS_BOUNDARY: false, // 是否存在边界
};

export { MAP };
