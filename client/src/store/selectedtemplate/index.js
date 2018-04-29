/* @flow */

import { createActions, createReducer, Handlers } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable('');

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
