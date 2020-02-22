import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../store/actions';
import uuid from 'uuid/v4';
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

const StyledAddTodo = styled.div`
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

function TodoForm({ handleModal, isOpen, type }) {
  const dispatch = useDispatch();
  const selected = useSelector(({ todos }) => todos.selectedTodo);

  const [todoName, setTodoName] = useState('');
  const [todoDesc, setTodoDesc] = useState('');

  useEffect(() => {
    if (!isOpen) {
      cleanFormFields();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selected && type === 'edit') {
      setTodoName(selected.name);
      setTodoDesc(selected.description);
    }
  }, [selected]);

  const handleInput = e => {
    setTodoName(e.target.value);
  };
  const handleTextArea = e => {
    setTodoDesc(e.target.value);
  };

  const cleanFormFields = () => {
    setTodoName('');
    setTodoDesc('');
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: uuid(),
      name: todoName,
      description: todoDesc,
      creationDate: new Date()
    };
    dispatch(addTodo(newTodo));
    handleModal();
  };
  return (
    <StyledAddTodo>
      <h4>ADD TODO</h4>
      <StyledInput
        onChange={handleInput}
        value={todoName}
        autoFocus
        placeholder="Name"
        type="text"
      />
      <StyledTextArea
        onChange={handleTextArea}
        value={todoDesc}
        placeholder="Description..."
      />
      <div>
        <Button color="#f7ab1b" onClick={handleAddTodo}>
          {type === 'edit' ? 'Update' : 'Add'}
        </Button>
        <Button onClick={handleModal}>Cancel</Button>
      </div>
    </StyledAddTodo>
  );
}

export default TodoForm;
