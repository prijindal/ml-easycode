import * as React from 'react';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'

// import configureStore from './store/configureStore';

// import RootComponent from './routes/root';

const RootComponent = () => (
  <div>
    Hello World
  </div>
)

// const { store, persistor } = configureStore();

// store.dispatch({type: "SAVE_USER", payload: { name:stringGen(10000) }})

const Root = () => (
  // <Provider store={store}>
    // <PersistGate loading={<div>Loading Application...</div>} persistor={persistor}>
      <RootComponent/>
    // </PersistGate>
  // </Provider>
);

export default Root;
