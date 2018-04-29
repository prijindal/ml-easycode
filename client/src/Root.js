/* @flow */

import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';

import StepperBar from './components/StepperBar';
import AppComponent from './routes/app';
import configureStore from './store/configureStore';
import { client } from './helpers/apollo';

const { store, history } = configureStore();

const Root = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <div>
        <StepperBar />
        <ConnectedRouter history={history}>
          <AppComponent />
        </ConnectedRouter>
      </div>
    </ApolloProvider>
  </Provider>
);

export default Root;
