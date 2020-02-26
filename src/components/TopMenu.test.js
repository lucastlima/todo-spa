import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import { renderWithRedux } from '../utils/testUtils';
import TopMenu from './TopMenu';

export const initialState = {
  todos: {
    allTodos: []
  },
  recording: {
    isRecording: false,
    isPlaying: false,
    session: [
      {
        type: 'ADD_TODO',
        payload: {
          id: 'ed6a9487-f8d3-4d17-b90a-db656dc6ac38',
          name: 'awdawdaw',
          description: 'dawdawd',
          creationDate: '2020-02-25T21:54:16.569Z'
        }
      }
    ]
  }
};

beforeEach(cleanup);

describe('Test add button', () => {
  it('Opens modal on click "+" ', () => {
    const { getByText } = renderWithRedux(<TopMenu />);
    fireEvent.click(getByText('+'));
    expect(getByText('ADD TODO')).toBeVisible();
  });

  it('add a new todo on click the ADD button', async () => {
    const { getByText, getByTestId, store } = renderWithRedux(<TopMenu />, {
      initialState
    });
    const { getState } = store;
    fireEvent.click(getByText('+'));
    const todoName = getByTestId('name-input');
    fireEvent.change(todoName, { target: { value: 'test' } });
    fireEvent.click(getByText('ADD'));
    expect(getState().todos.allTodos).toHaveLength(1);
    expect(getState().todos.allTodos[0].name).toBe('test');
  });
});

describe('Test recording buttons', () => {
  it('Starts recording the session - rec button', async () => {
    const { store, container, getByText, getByTestId } = renderWithRedux(
      <TopMenu />,
      {
        initialState
      }
    );
    const { getState } = store;
    const recBtn = container.querySelector('#rec').firstChild;
    fireEvent.click(recBtn);
    expect(getState().recording.isRecording).toBeTruthy();
    fireEvent.click(getByText('+'));
    const todoName = getByTestId('name-input');
    fireEvent.change(todoName, { target: { value: 'record123' } });
    fireEvent.click(getByText('ADD'));
    // Rec button overrites any previous recorded sections
    expect(getState().recording.session).toHaveLength(1);
    expect(getState().recording.session[0].payload.name).toBe('record123');
  });

  it('Stops recording the session - stop button', () => {
    const { store, container } = renderWithRedux(<TopMenu />, {
      recording: {
        isRecording: true
      }
    });
    const { getState } = store;
    const stopBtn = container.querySelector('#stop').firstChild;
    fireEvent.click(stopBtn);
    expect(getState().recording.isRecording).toBeFalsy();
  });

  it('Starts playing the session - play button', async () => {
    const { store, container } = renderWithRedux(<TopMenu />, {
      initialState
    });
    //window.alert = jest.fn();
    const { getState } = store;
    const playBtn = container.querySelector('#play').firstChild;
    fireEvent.click(playBtn);
    expect(getState().recording.isPlaying).toBeTruthy();
    await wait(() => {
      expect(getState().todos.allTodos).toHaveLength(1);
    });
  });
  it('Deletes recorded session', () => {
    const { store, container } = renderWithRedux(<TopMenu />, {
      initialState
    });
    const { getState } = store;
    const deleteBtn = container.querySelector('#deleteRec').firstChild;
    fireEvent.click(deleteBtn);
    expect(getState().recording.session).toHaveLength(0);
  });
});
