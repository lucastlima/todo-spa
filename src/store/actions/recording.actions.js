import {
  START_RECORDING,
  STOP_RECORDING,
  START_SESSION_REPLAY,
  DELETE_RECORDED_SESSION,
  END_SESSION_REPLAY,
  RESET_APP_STATE
} from '../actiontypes';

export const startRecording = () => (dispatch, getState) => {
  dispatch({ type: START_RECORDING });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};

export const stopRecording = () => (dispatch, getState) => {
  dispatch({ type: STOP_RECORDING });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};

export const deleteRecordingSession = () => (dispatch, getState) => {
  dispatch({ type: DELETE_RECORDED_SESSION });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};

export const playRecordingSession = () => async (dispatch, getState) => {
  dispatch({ type: START_SESSION_REPLAY });
  const session = getState().recording.session;
  let counter = 0;
  const runTimeLine = () =>
    new Promise((res, rej) => {
      try {
        if (session.length) {
          dispatch({ type: RESET_APP_STATE });
          const timeline = setInterval(() => {
            if (counter < session.length) {
              dispatch(session[counter]);
              counter++;
            } else {
              clearInterval(timeline);
              res();
            }
          }, 1000);
        } else {
          alert('No records found!');
          res();
        }
      } catch (error) {
        rej();
        console.log(error);
      }
    });
  await runTimeLine();
  dispatch({ type: END_SESSION_REPLAY });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};
