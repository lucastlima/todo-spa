import { createGlobalStyle } from 'styled-components/dist/styled-components';

export default createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  body, html {
    margin: 0;
    height: 100%;
  }

  #root {
    display: flex;
    height: 100%;
    background-color: purple;
  }
`;
