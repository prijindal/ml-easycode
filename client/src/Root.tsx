import * as React from 'react';
import { Provider } from 'react-redux';

import AppComponent from './routes/app';
import configureStore from './store/configureStore';

const { store } = configureStore();

const Root = () => (
  <Provider store={store}>
    <AppComponent/>
  </Provider>
);

export default Root;
