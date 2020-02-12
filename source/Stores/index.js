import { combineReducers } from "redux";
import { reducer as gameReducer } from "../Stores/game";

const rootReducers = combineReducers({
	game: gameReducer,
});

export { rootReducers };
