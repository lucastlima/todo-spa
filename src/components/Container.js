import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default Container;
