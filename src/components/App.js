import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, selectTodo, editTodo } from "../store/actions";
import Button from "./Button";

import Todo from "./Todo";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
import Layout from "./Layout";

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
  const selected = useSelector(({ todos }) => todos.selectedTodo);
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selected) {
      setTodoName(selected.name);
      setTodoDesc(selected.description);
    }
  }, [selected]);

  function handleInput(e) {
    if (e.target.name === "name") {
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
    const newTodo = {
      ...selected,
      name: todoName,
      description: todoDesc,
      timestamp: new Date().valueOf()
    };
    dispatch(editTodo(newTodo));
    handleModal();
  };

  return (
    <Layout>
      <StyledApp>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            editTodo={handleTodoSelection}
            deleteTodo={handleDelete}
          />
        ))}
      </StyledApp>
      <Modal close={handleModal} open={isModalOpen}>
        <TodoForm
          title="EDIT TODO"
          isOpen={isModalOpen}
          setModal={handleModal}
          controlInput={handleInput}
          name={todoName}
          desc={todoDesc}
          isOpen={isModalOpen}
        >
          <Button color="#f7ab1b" onClick={handleEditTodo}>
            EDIT
          </Button>
        </TodoForm>
      </Modal>
    </Layout>
  );
}

export default App;
