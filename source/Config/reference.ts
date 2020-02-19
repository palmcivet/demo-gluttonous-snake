enum dirOrien {
	U,
	D,
	L,
	R,
}

enum mapView {
	block,
	empty,
	twinkle,
}

enum mapStyle {
	block = "cell-block",
	empty = "cell-map",
	twinkle = "cell-twinkle",
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

export { dirOrien, mapView, mapStyle, i18n };
