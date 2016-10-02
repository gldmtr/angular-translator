import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';
import startIpc from './middlewares/ipc';

const store = createStore(reducers);

startIpc(store);

const rootEl = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, rootEl);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./components/App').default;

    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>
    , rootEl);
  });
}
