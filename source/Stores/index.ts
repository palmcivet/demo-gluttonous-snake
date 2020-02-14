import { combineReducers } from "redux";
import { reducer as gameReducer } from "./game";

const rootReducers = combineReducers({
	game: gameReducer,
});

export { rootReducers };
