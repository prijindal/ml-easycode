/* @flow */

import { call, put, takeEvery } from 'redux-saga/effects';
import { createReducer, Handlers } from 'reduxsauce';

type Action<T> = {
  payload: T | Error,
  type: string,
};

export type GenericState<T> = {
  data: T,
  error: null | Error,
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

  createReducer(initData: T) {
    const INITIAL_STATE: GenericState<T> = {
      data: initData,
      error: null,
      isLoading: false,
    };

    const HANDLERS: Handlers = {
      [this.SUCCESS]: (state: Object = INITIAL_STATE, action: Action<T>) => ({
        data: action.payload,
        error: null,
        isLoading: true,
      }),
      [this.ERROR]: (state: Object = INITIAL_STATE, action: Action<T>) => ({
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

  const saga: * = function*(): any {
    yield takeEvery(state.START, (internalsaga: any));
  };

  return saga;
}

export default State;
