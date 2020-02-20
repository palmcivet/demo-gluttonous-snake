import { combineReducers } from "redux";
import { reducer as gameReducer } from "./game";
import { reducer as controlReducer } from "./control";

const rootReducer = combineReducers({
	game: gameReducer,
	control: controlReducer,
});

type rootState = ReturnType<typeof rootReducer>;

export { rootReducer, rootState };
