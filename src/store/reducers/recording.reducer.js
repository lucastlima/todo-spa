import {
  START_RECORDING,
  STOP_RECORDING,
  START_SESSION_REPLAY,
  END_SESSION_REPLAY,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  DELETE_RECORDED_SESSION
} from '../actiontypes';

const initialState = {
  isRecording: false,
  isPlaying: false,
  session: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_RECORDING:
      return { ...state, isRecording: true, session: [] };
    case STOP_RECORDING:
      return { ...state, isRecording: false };
    case START_SESSION_REPLAY:
      return { ...state, isRecording: false, isPlaying: true };
    case END_SESSION_REPLAY:
      return { ...state, isPlaying: false };
    case DELETE_RECORDED_SESSION:
      return { ...state, session: [], isRecording: false };
    case ADD_TODO:
      return state.isRecording
        ? {
            ...state,
            session: [...state.session, { type, payload }]
          }
        : state;
    case REMOVE_TODO:
      return state.isRecording
        ? {
            ...state,
            session: [...state.session, { type, payload }]
          }
        : state;
    case UPDATE_TODO:
      return state.isRecording
        ? {
            ...state,
            session: [...state.session, { type, payload }]
          }
        : state;
    default:
      return state;
  }
};
