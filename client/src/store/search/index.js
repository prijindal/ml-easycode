/* @flow */

import { createActions, createReducer, Handlers } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable('');

export const { Types, Creators } = createActions({
  resetSearch: [],
  setSearch: ['search'],
});

const HANDLERS: Handlers = {
  [Types.RESET_SEARCH]: (state = INITIAL_STATE, action: any) => '',
  [Types.SET_SEARCH]: (state = INITIAL_STATE, action: any) => action.search,
};

export default createReducer(INITIAL_STATE, HANDLERS);
