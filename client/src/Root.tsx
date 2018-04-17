import * as React from 'react';
import { Provider } from 'react-redux';

import AppComponent from './routes/app';
import configureStore from './store/configureStore';

import templates from './store/templates';

const { store } = configureStore();

setTimeout(() => {
  store.dispatch(templates.start());
}, 1000);

const Root = () => (
  <Provider store={store}>
    <AppComponent/>
  </Provider>
);

export default Root;
