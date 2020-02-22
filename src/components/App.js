import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, selectTodo } from '../store/actions';

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

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(({ todos }) => todos.allTodos);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDelete = id => {
    dispatch(removeTodo(id));
  };
  const handleEditTodo = id => {
    dispatch(selectTodo(id));
    handleModal();
  };

  return (
    <Layout>
      <StyledApp>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            editTodo={handleEditTodo}
            deleteTodo={handleDelete}
          />
        ))}
      </StyledApp>
      <Modal close={handleModal} open={isModalOpen}>
        <TodoForm type="edit" isOpen={isModalOpen} handleModal={handleModal} />
      </Modal>
    </Layout>
  );
}

export default App;
