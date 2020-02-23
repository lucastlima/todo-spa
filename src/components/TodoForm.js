import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyledInput = styled.input`
  border: none;
  margin: 0.5rem 0;
  line-height: 2rem;
  padding: 0 0.5rem;
  box-shadow: var(--shadow-one);
  border-radius: 0.3rem;
  font-size: 1rem;
  font-weight: 400;
  color: inherit;
  &::placeholder {
    font-size: 1rem;
    color: #aaa;
  }
`;

const StyledTextArea = styled.textarea`
  font-size: 1.4rem;
  height: 5rem;
  border: none;
  margin: 0.5rem 0;
  padding: 0.5rem;
  box-shadow: var(--shadow-one);
  border-radius: 0.3rem;
  resize: none;
  color: inherit;
  font-weight: 400;
  &::placeholder {
    font-size: 1rem;
    color: #aaa;
  }
`;

const StyledTodoForm = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  width: 30rem;
  max-width: 90vw;
  height: auto;
  background-color: var(--white);
  padding: 1rem;
  box-shadow: var(--shadow-tree);
`;

function TodoForm({ controlInput, setModal, name, desc, title, children }) {
  return (
    <StyledTodoForm>
      <h4>{title}</h4>
      <StyledInput
        autoComplete="off"
        onChange={controlInput}
        value={name}
        type="text"
        name="name"
        placeholder="Name"
      />
      <StyledTextArea
        onChange={controlInput}
        name="description"
        value={desc}
        placeholder="Description..."
      />
      <div>
        {children}
        <Button onClick={setModal}>Cancel</Button>
      </div>
    </StyledTodoForm>
  );
}

export default TodoForm;
