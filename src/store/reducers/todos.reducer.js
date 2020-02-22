import { ADD_TODO, REMOVE_TODO, SELECT_TODO } from '../actiontypes';

const initialState = {
  allTodos: [],
  selectedTodo: null
};

// ID:
// Name:
// Description:
// CreationDate:

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, allTodos: [...state.allTodos, action.payload] };
    case REMOVE_TODO:
      return { ...state, allTodos: action.payload };
    case SELECT_TODO:
      return { ...state, selectedTodo: action.payload };
    default:
      return state;
  }
};
