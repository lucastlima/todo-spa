import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../utils/testUtils';
import App from './App';

export const initialState = {
  todos: {
    allTodos: []
  },
  recording: {
    isRecording: false
  }
};

it('can render with redux with defaults', () => {
  const { getByTestId } = renderWithRedux(<App />, { initialState });
  expect(getByTestId('todo-container')).toBeInTheDocument();
});
