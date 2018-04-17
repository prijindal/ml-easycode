import { combineReducers } from 'redux';

import search from './search';
import templates from './templates';

export default combineReducers({
  search,
  templates: templates.createReducer([]),
});
