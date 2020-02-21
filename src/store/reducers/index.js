import { combineReducers } from "redux";
import todosReducer from "./todos.reducer";
import recordingReducer from "./recording.reducer";

const rootReducer = combineReducers({
  todos: todosReducer,
  recording: recordingReducer
});

export default rootReducer;
