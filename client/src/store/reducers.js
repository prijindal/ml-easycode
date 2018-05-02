/* @flow */

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import parameters from './parameters';
import search from './search';
import selectedtemplate from './selectedtemplate';

export default combineReducers({
  router: routerReducer,
  parameters,
  search,
  selectedtemplate,
});
