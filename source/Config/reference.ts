/**
 * Up / Down / Left / Right
 */
enum dirOrien {
	D,
	U,
	L,
	R,
}

/**
 * keyboard
 */
enum dirKey {
	W,
	S,
	A,
	D,
}

const i18n = {
	cn: {
		title_raw: "贪吃蛇",
		title_play: "游戏中",
		title_pause: "暂停",
	},
	en: {
		title_raw: "gluttonous snake",
		title_play: "Playing",
		title_pause: "Pausing",
	},
};

export { dirOrien, dirKey, i18n };
