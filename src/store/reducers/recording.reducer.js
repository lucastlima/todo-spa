const initialState = {
  isRecording: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
      return { ...state, test: true };
    default:
      return state;
  }
};