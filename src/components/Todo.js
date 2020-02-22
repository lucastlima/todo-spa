import React from 'react';
import styled from 'styled-components';
import Delete from '@material-ui/icons/CancelRounded';
import Create from '@material-ui/icons/Create';

const StyledTodo = styled.div`
  display: flex;
  flex-direction: column;
  height: min-content;
  min-height: 6rem;
  max-height: 8rem;
  width: 100%;
  background-color: var(--white);
  box-shadow: var(--shadow-two);
  margin-bottom: 0.6rem;
  color: var(--dark-blue);
  padding: 1rem;
  overflow: hidden;
  border-radius: 0.3rem;
  transition: all 0.3s ease-in;

  &:hover {
    max-height: 100%;
  }

  & p {
    word-break: break-all;
    overflow-y: auto;
    color: #a7b1b8;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & .header {
    display: flex;
    justify-content: space-between;
  }

  #create,
  #delete {
    font-size: 1.2rem;
    color: #a7b1b8;
    cursor: pointer;
    transition: color 0.1s ease-in;
    will-change: color;
    &:hover {
      color: var(--dark-blue);
    }
  }
`;

function Todo({ id, name, description, editTodo, deleteTodo }) {
  return (
    <StyledTodo>
      <div className="header">
        <h4>{name}</h4>
        <span>
          <Create id="create" onClick={() => editTodo(id)} />
          <Delete id="delete" onClick={() => deleteTodo(id)} />
        </span>
      </div>
      <p>{description}</p>
    </StyledTodo>
  );
}

export default Todo;
