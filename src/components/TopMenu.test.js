import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup } from '@testing-library/react';
import { renderWithRedux } from '../utils/testUtils';
import TopMenu from './TopMenu';

export const initialState = {
  todos: {
    allTodos: []
  },
  recording: {
    isRecording: false
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
    const { getByText, store } = renderWithRedux(<TopMenu />, { initialState });
    const { getState } = store;
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('ADD'));
    expect(getState().todos.allTodos).toHaveLength(1);
  });
});
