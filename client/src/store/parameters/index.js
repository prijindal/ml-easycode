/* @flow */

import { createActions, createReducer, Handlers } from 'reduxsauce';

type Parameter = {};

const INITIAL_STATE: Parameter = {};

export const { Types, Creators } = createActions({
  resetParameters: [],
  setParameters: ['parameters'],
  setParameter: ['parametername', 'parametervalue'],
});

const keyToArray = (key: string): string[] => key.split('.');

const arrayToObj = (keyArr: string[], value: any) => {
  var obj = {};
  if (keyArr.length === 1) {
    obj[keyArr[0]] = value;
    return obj;
  } else {
    obj[keyArr[0]] = arrayToObj(keyArr.splice(1), value);
    return obj;
  }
};

const HANDLERS: Handlers = {
  [Types.RESET_PARAMETERS]: (state = INITIAL_STATE, action: any) => {},
  [Types.SET_PARAMETERS]: (state = INITIAL_STATE, action: any) =>
    action.parameters,
  [Types.SET_PARAMETER]: (state = INITIAL_STATE, action: any) => ({
    ...state,
    ...arrayToObj(keyToArray(action.parametername), action.parametervalue),
  }),
};

export default createReducer(INITIAL_STATE, HANDLERS);
