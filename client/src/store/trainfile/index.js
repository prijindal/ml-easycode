/* @flow */

import { createActions, createReducer, Handlers } from 'reduxsauce';

const INITIAL_STATE = '';

export const { Types, Creators } = createActions({
  resetFile: [],
  setFile: ['file'],
});

const HANDLERS: Handlers = {
  [Types.RESET_FILE]: (state = INITIAL_STATE, action: any) => '',
  [Types.SET_FILE]: (state = INITIAL_STATE, action: any) => action.file,
};

export default createReducer(INITIAL_STATE, HANDLERS);
