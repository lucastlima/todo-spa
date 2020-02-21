import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Container from "./Container";
import Layout from "./Layout";

const StyledApp = styled.div`
  display: flex;
  flex: 12;
  color: white;
  padding: 1rem;
`;

function App() {
  const todos = useSelector(({ todos }) => todos.allTodos);

  return (
    <Layout>
      <StyledApp>
        <Container>
          {todos.map(todo => (
            <div key={todo.id}>
              <h2>{todo.name}</h2>
              <p>{todo.description}</p>
            </div>
          ))}
        </Container>
      </StyledApp>
    </Layout>
  );
}

export default App;
