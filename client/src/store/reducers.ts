import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import search from './search';
import templates from './templates';

export default combineReducers({
  router: routerReducer,
  search,
  templates: templates.createReducer([]),
});
