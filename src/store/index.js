import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const initialState = () => {
  if ("todo-spa" in localStorage) {
    return JSON.parse(localStorage.getItem("todo-spa"));
  } else {
    return undefined;
  }
};

const store = createStore(
  rootReducer,
  initialState(),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
