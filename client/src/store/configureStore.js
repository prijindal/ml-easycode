/* @flow */

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducers';
import sagaMiddleware, { registerSagas } from './sagas';

export default () => {
  const history = createHistory();
  const routerMid = routerMiddleware(history);
  const middlewaresList = [sagaMiddleware, routerMid];
  if (process.env.NODE_ENV !== 'production') {
    middlewaresList.push(logger);
  }
  const middleware = applyMiddleware(...middlewaresList);
  const store = createStore(reducer, middleware);
  registerSagas();
  return { store, history };
};
