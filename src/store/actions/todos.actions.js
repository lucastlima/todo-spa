import { ADD_TODO } from "../actiontypes";

export const addTodo = todo => ({
  type: ADD_TODO,
  payload: todo
});
