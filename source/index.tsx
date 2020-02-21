import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./Page/App";
import { configureStore } from "./Store/configureStore";
import "./Styles/index.less";

const rootStore = configureStore();

ReactDOM.render(
	<Provider store={rootStore}>
		<App />
	</Provider>,
	document.getElementById("root")
);
