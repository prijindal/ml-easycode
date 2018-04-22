import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react'

import StepperBar from './components/StepperBar';
import AppComponent from './routes/app';
import configureStore from './store/configureStore';

const { store, persistor, history } = configureStore();

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StepperBar />  
      <ConnectedRouter history={history}>      
        <AppComponent/>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default Root;
