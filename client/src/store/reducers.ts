import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import search from './search';
import selectedtemplate from './selectedtemplate';
import templates from './templates';

export default combineReducers({
  router: routerReducer,
  search,
  selectedtemplate,
  templates: templates.createReducer([]),
});
