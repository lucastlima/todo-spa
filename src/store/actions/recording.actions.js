import {
  START_RECORDING,
  STOP_RECORDING,
  START_SESSION_REPLAY,
  DELETE_RECORDED_SESSION,
  END_SESSION_REPLAY,
  RESET_APP_STATE
} from '../actiontypes';
import { setDialogBox } from '../actions';

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
        let timeline;
        if (session.length) {
          dispatch({ type: RESET_APP_STATE });

          const highlightFunc = id => {
            const todo = document.getElementById(`${id}`);
            todo.classList.add('highlight');
            setTimeout(() => {
              todo.classList.remove('highlight');
            }, 1000);
          };

          timeline = setInterval(() => {
            if (counter < session.length) {
              if (session[counter].type === 'UPDATE_TODO') {
                const id = session[counter].payload.id;
                highlightFunc(id);
              }
              if (session[counter].type === 'REMOVE_TODO') {
                const validTodos = session.filter(
                  todo => todo.type === 'ADD_TODO'
                );
                const sessionTodos = [];
                session[counter].payload.todos.forEach(todo => {
                  if (
                    validTodos.find(({ payload }) => payload.id === todo.id)
                  ) {
                    sessionTodos.push(todo);
                  }
                });
                session[counter].payload.todos = sessionTodos;
              }

              dispatch(session[counter]);
              counter++;
            } else {
              clearInterval(timeline);
              res();
            }
          }, 1000);
        } else {
          dispatch(
            setDialogBox({
              title: 'Message:',
              message: 'No sessions found. Please record a session first.'
            })
          );
          res();
        }
      } catch (error) {
        rej();
        console.log(error);
        clearInterval(timeline);
      }
    });
  await runTimeLine();
  dispatch({ type: END_SESSION_REPLAY });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};
