import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components/dist/styled-components';
import { Provider } from 'react-redux';
import App from './components/App';
import theme from './utils/theme';
import GlobalStyle from './utils/global';
import store from './store';

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </Provider>,
  root
);
