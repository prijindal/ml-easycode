/* @flow */

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import search from './search';
import selectedtemplate from './selectedtemplate';

export default combineReducers({
  router: routerReducer,
  search,
  selectedtemplate,
});
