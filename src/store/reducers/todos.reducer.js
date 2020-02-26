import {
  ADD_TODO,
  REMOVE_TODO,
  SELECT_TODO,
  UPDATE_TODO,
  RESET_APP_STATE,
  SET_DIALOGBOX
} from "../actiontypes";

const initialState = {
  allTodos: [],
  selectedTodo: null,
  dialogBox: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, allTodos: [...state.allTodos, action.payload] };
    case REMOVE_TODO:
      return { ...state, allTodos: action.payload.todos };
    case SELECT_TODO:
      return { ...state, selectedTodo: action.payload };
    case UPDATE_TODO:
      const newData = state.allTodos.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            name: action.payload.name,
            description: action.payload.description
          };
        } else {
          return Object.assign({}, todo);
        }
      });
      return { ...state, allTodos: newData };
    case RESET_APP_STATE:
      return {
        ...state,
        allTodos: []
      };
    case SET_DIALOGBOX:
      return {
        ...state,
        // format {title: string, message: string}
        dialogBox: action.payload
      };
    default:
      return state;
  }
};
