import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import AppComponent from './routes/app';
import configureStore from './store/configureStore';

const { store, persistor } = configureStore();

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppComponent/>
    </PersistGate>
  </Provider>
);

export default Root;
