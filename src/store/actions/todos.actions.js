import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SELECT_TODO
} from '../actiontypes';

export const addTodo = todo => (dispatch, getState) => {
  dispatch({ type: ADD_TODO, payload: todo });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};

export const selectTodo = id => (dispatch, getState) => {
  const todos = getState().todos.allTodos;
  const todo = todos.find(todo => todo.id === id);
  dispatch({ type: SELECT_TODO, payload: todo });
};

export const removeTodo = id => (dispatch, getState) => {
  const todos = getState().todos.allTodos;
  console.log(todos);

  const newTodos = todos.filter(todo => todo.id !== id);
  dispatch({ type: REMOVE_TODO, payload: newTodos });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};

export const editTodo = id => (dispatch, getState) => {
  const todos = getState().todos.allTodos;
  const todo = todos.find(todo => todo.id === id);

  dispatch({ type: UPDATE_TODO, payload: todo });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};
