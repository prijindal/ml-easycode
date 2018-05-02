/* @flow */

import { createActions, createReducer, Handlers } from 'reduxsauce';

type Parameter = {};

const INITIAL_STATE: Parameter = {};

export const { Types, Creators } = createActions({
  resetParameters: [],
  setParameters: ['parameters'],
});

const HANDLERS: Handlers = {
  [Types.RESET_PARAMETERS]: (state = INITIAL_STATE, action: any) => {},
  [Types.SET_PARAMETERS]: (state = INITIAL_STATE, action: any) =>
    action.parameters,
};

export default createReducer(INITIAL_STATE, HANDLERS);
