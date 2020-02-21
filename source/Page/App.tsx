import React from "react";
const eatAudio = require("../../static/music/eat.mp3");
const overAudio = require("../../static/music/over.mp3");
const musicAudio = require("../../static/music/music.mp3");
import { Console } from "./Console/Console";

const AppView = () => {
	return (
		<>
			<div className="app">
				<Console />
			</div>
			<script type="text/javascript" src="script/ribbon-dynamic.js"></script>
			<audio id="eat" src={eatAudio.default} hidden={false}></audio>
			<audio id="over" src={overAudio.default} hidden={false}></audio>
			<audio id="music" src={musicAudio.default} hidden={false}></audio>
		</>
	);
};

const App = AppView;

export default App;
