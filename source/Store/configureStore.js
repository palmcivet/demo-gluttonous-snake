import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./index";

let finalCreateStore;

if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
	finalCreateStore = compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__()
	)(createStore);
} else {
	finalCreateStore = applyMiddleware(thunk)(createStore);
}

const configureStore = (initialState) => {
	const store = finalCreateStore(rootReducer, initialState);

	if (process.env.NODE_ENV !== "production" && module.hot) {
		module.hot.accept("./index", () => store.replaceReducer(require("./index")));
	}

	return store;
};

export { configureStore };
