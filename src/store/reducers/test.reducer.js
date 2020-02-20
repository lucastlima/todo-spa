const initialState = {
  test: false
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case 'TEST':
      return { ...state, test: true };
    default:
      return state;
  }
};
