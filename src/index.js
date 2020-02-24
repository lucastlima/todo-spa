import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import GlobalStyle from './utils/global';
import store from './store';
import whyDidYouUpdate from 'why-did-you-update';

if (process.env.NODE_ENV === 'development') {
  whyDidYouUpdate(React);
}

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
    <GlobalStyle />
  </Provider>,
  root
);
