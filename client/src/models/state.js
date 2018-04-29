/* @flow */

import { call, put, takeEvery } from 'redux-saga/effects';
import { createReducer, Handlers } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

import { type Action } from '../models/base';

export type GenericState<T> = {
  data: T,
  error: void | Error,
  isLoading: boolean,
};

export class State<T> {
  START: string;
  SUCCESS: string;
  ERROR: string;

  constructor(actionString: string) {
    this.SUCCESS = actionString + '_SUCCESS';
    this.ERROR = actionString + '_ERROR';
    this.START = actionString + '_START';
  }

  createReducer(initData: any) {
    const INITIAL_STATE: GenericState<T> = Immutable({
      data: initData,
      error: null,
      isLoading: false,
    });

    const HANDLERS: Handlers = {
      [this.SUCCESS]: (state: Object = INITIAL_STATE, action: Action) => ({
        data: action.payload,
        error: null,
        isLoading: true,
      }),
      [this.ERROR]: (state: Object = INITIAL_STATE, action: Action) => ({
        error: action.payload,
        isLoading: true,
      }),
    };

    return createReducer(INITIAL_STATE, HANDLERS);
  }

  success = (data: T) => ({
    payload: data,
    type: this.SUCCESS,
  });

  error = (error: Error) => ({
    payload: error,
    type: this.ERROR,
  });

  start = () => ({ type: this.START });

  api: () => Promise<T>;
}

export function getSaga(state: State<any>) {
  function* internalsaga() {
    try {
      const response = yield call(state.api);
      yield put(state.success(response));
    } catch (e) {
      yield put(state.error(e));
    }
  }

  function* saga() {
    yield takeEvery(state.START, internalsaga);
  }

  return saga;
}

export default State;
