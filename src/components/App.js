import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, selectTodo, editTodo } from '../store/actions';
import Button from './Button';

import Todo from './Todo';
import Modal from './Modal';
import TodoForm from './TodoForm';
import Layout from './Layout';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  color: white;
  padding: 1rem;
  overflow-y: auto;
`;

function WrappedApp() {
  const dispatch = useDispatch();
  const todos = useSelector(({ todos }) => todos.allTodos);
  const selected = useSelector(({ todos }) => todos.selectedTodo);
  const [todoName, setTodoName] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selected) {
      setTodoName(selected.name);
      setTodoDesc(selected.description);
    }
  }, [selected]);

  function handleInput(e) {
    if (e.target.name === 'name') {
      setTodoName(e.target.value);
    } else {
      setTodoDesc(e.target.value);
    }
  }

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDelete = id => {
    dispatch(removeTodo(id));
  };
  const handleTodoSelection = id => {
    dispatch(selectTodo(id));
    handleModal();
  };

  const handleEditTodo = () => {
    if (!todoName) {
      setError('Name is required.');
      setTimeout(() => {
        setError(null);
      }, 1500);
      return;
    }
    const newTodo = {
      ...selected,
      name: todoName,
      description: todoDesc
    };

    dispatch(editTodo(newTodo));
    handleModal();
  };

  return (
    <Layout>
      <StyledApp data-testid="todo-container">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            editTodo={handleTodoSelection}
            deleteTodo={handleDelete}
          />
        ))}
      </StyledApp>
      {isModalOpen ? (
        <Modal close={handleModal} open={isModalOpen}>
          <TodoForm
            title="EDIT TODO"
            error={error}
            isOpen={isModalOpen}
            setModal={handleModal}
            controlInput={handleInput}
            name={todoName}
            desc={todoDesc}
            isOpen={isModalOpen}
          >
            <Button colorProp="#f7ab1b" onClick={handleEditTodo}>
              EDIT
            </Button>
          </TodoForm>
        </Modal>
      ) : null}
    </Layout>
  );
}

const App = memo(WrappedApp);

export default App;
