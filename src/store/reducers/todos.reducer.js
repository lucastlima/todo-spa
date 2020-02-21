import { ADD_TODO } from "../actiontypes";

const initialState = {
  allTodos: []
};

// ID:
// Name:
// Description:
// CreationDate:

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, allTodos: [...state.allTodos, action.payload] };
    default:
      return state;
  }
};
