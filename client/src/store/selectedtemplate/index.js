/* @flow */

import { createActions, createReducer, Handlers } from 'reduxsauce';

const INITIAL_STATE = '';

export const { Types, Creators } = createActions({
  resetTemplate: [],
  setTemplate: ['templateid'],
});

const HANDLERS: Handlers = {
  [Types.RESET_TEMPLATE]: (state = INITIAL_STATE, action: any) => '',
  [Types.SET_TEMPLATE]: (state = INITIAL_STATE, action: any) =>
    action.templateid,
};

export default createReducer(INITIAL_STATE, HANDLERS);
