import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./Pages/App";
import { configureStore } from "./Stores/configureStore";
import "./Styles/index.less";

const rootStore = configureStore();

ReactDOM.render(
	<Provider store={rootStore}>
		<App />
	</Provider>,
	document.getElementById("root")
);
