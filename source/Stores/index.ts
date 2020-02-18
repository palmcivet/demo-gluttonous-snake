import { combineReducers } from "redux";
import { reducer as gameReducer } from "./game";
import { reducer as controlReducer } from "./control";

const rootReducers = combineReducers({
	game: gameReducer,
	control: controlReducer,
});

export { rootReducers };
