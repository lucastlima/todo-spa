import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/actions";
import uuid from "uuid/v4";

import Container from "./Container";
import Button from "./Button";
import Modal from "./Modal";

const SyledTopMenu = styled.div`
  display: flex;
  height: 4rem;
  z-index: 1;
  flex-direction: column;
  background-color: var(--white);
  padding: 0.5rem 1rem;
  justify-content: center;
  color: var(--dark-blue);
  box-shadow: var(--shadow-two);
`;

const StyledAddTodoBtn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 2.5rem;
  cursor: pointer;
  color: var(--dark-blue);

  &:hover {
    transform: scale(1.08);
    text-shadow: var(--shadow-one);
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

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  border: none;
  margin: 0.5rem 0;
  line-height: 2rem;
  padding: 0 0.5rem;
  box-shadow: var(--shadow-one);
  border-radius: 0.3rem;
  font-size: 1rem;
  font-weight: 600;
  color: inherit;
  &::placeholder {
    font-size: 1rem;
    color: #aaa;
  }
`;

const StyledTextArea = styled.textarea`
  font-size: 1rem;
  height: 5rem;
  border: none;
  margin: 0.5rem 0;
  padding: 0.5rem;
  box-shadow: var(--shadow-one);
  border-radius: 0.3rem;
  resize: none;
  color: inherit;
  &::placeholder {
    font-size: 1rem;
    color: #aaa;
  }
`;

function TopMenu() {
  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInput = e => {
    setTodoName(e.target.value);
  };
  const handleTextArea = e => {
    setTodoDesc(e.target.value);
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: uuid(),
      name: todoName,
      description: todoDesc,
      creationDate: new Date()
    };
    dispatch(addTodo(newTodo));
    setTodoName("");
    setTodoDesc("");
    handleModal();
  };

  return (
    <SyledTopMenu>
      <Container>
        <StyledWrapper>
          <h2>TODO SPA</h2>
          <StyledAddTodoBtn onClick={handleModal}>+</StyledAddTodoBtn>
        </StyledWrapper>
      </Container>
      <Modal close={handleModal} open={isModalOpen}>
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
              Add
            </Button>
            <Button onClick={handleModal}>Cancel</Button>
          </div>
        </StyledAddTodo>
      </Modal>
    </SyledTopMenu>
  );
}

export default TopMenu;
