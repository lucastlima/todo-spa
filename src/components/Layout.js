import React from "react";
import styled from "styled-components";
import TopMenu from "./TopMenu";

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  flex-direction: column;
`;

function Layout({ children }) {
  return (
    <StyledLayout>
      <TopMenu />
      {children}
    </StyledLayout>
  );
}

export default Layout;
