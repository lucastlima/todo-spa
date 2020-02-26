import React from 'react';
import styled from 'styled-components';
import Delete from '@material-ui/icons/CancelRounded';
import Edit from '@material-ui/icons/Create';
import { handleDate } from '../utils/utils';

const StyledTodo = styled.div`
  display: flex;
  flex-direction: column;
  height: min-content;
  min-height: 7rem;
  max-height: 8rem;
  width: 100%;
  background-color: var(--white);
  box-shadow: var(--shadow-two);
  margin-bottom: 0.6rem;
  color: var(--dark-blue);
  padding: 1rem;
  overflow: hidden;
  border-radius: 0.3rem;
  animation: todoIn 0.2s ease-in;

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

  .edit-todo,
  .delete-todo {
    font-size: 1.2rem;
    color: #a7b1b8;
    cursor: pointer;
    transition: color 0.1s ease-in;
    will-change: color;

    &:hover {
      color: var(--dark-blue);
    }
  }

  .todo-desc {
    display: flex;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .todo-date {
    font-size: 0.7rem;
    text-align: right;
    padding-top: 0.5rem;
  }
`;

function Todo({ id, name, description, editTodo, deleteTodo, creationDate }) {
  const { month, day, hour, min, sec } = handleDate(creationDate);
  return (
    <StyledTodo id={id}>
      <div className="header">
        <h4>{name}</h4>
        <span>
          <Edit className="edit-todo" onClick={() => editTodo(id)} />
          <Delete className="delete-todo" onClick={() => deleteTodo(id)} />
        </span>
      </div>
      <div className="todo-desc">
        <p>{description}</p>
      </div>
      <span className="todo-date">{`${month}, ${day} at ${hour}:${min}:${sec}`}</span>
    </StyledTodo>
  );
}

export default Todo;
