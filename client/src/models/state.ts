import { call, put, takeEvery } from 'redux-saga/effects';
import { createReducer, Handlers } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

import { Action } from '../models/base';

export abstract class State<T> {
  public START: string;
  private SUCCESS: string;
  private ERROR: string;

  constructor(actionString: string) {
    this.SUCCESS = actionString + '_SUCCESS';
    this.ERROR = actionString + '_ERROR';
    this.START = actionString + '_START';
  }

  public createReducer(initData: any) {
    const INITIAL_STATE = Immutable({
      data: initData,
      error: null,
      isLoading: false,
    });

    const HANDLERS: Handlers = {
      [this.SUCCESS]: (state: object = INITIAL_STATE, action: Action) => ({
        data: action.payload,
        error: null,
        isLoading: true,
      }),
      [this.ERROR]: (state: object = INITIAL_STATE, action: Action) => ({
        // error: action.payload,
        isLoading: true,
      }),
    };

    return createReducer(INITIAL_STATE, HANDLERS);
  }

  public success = (data: T) => ({
    payload: data,
    type: this.SUCCESS,
  })

  public error = (error: Error) => ({
    payload: error,
    type: this.ERROR,
  })

  public start = () => ({type: this.START})

  public abstract api(): Promise<T>;
}

export function getSaga(state: State<any>) {
  function *internalsaga() {
    try {
      const response = yield call(state.api);
      yield put(state.success(response));
    } catch(e) {
      yield put(state.error(e));
    }
  }
  
  function* saga() {
    yield takeEvery(state.START, internalsaga);
  }

  return saga;
}

export default State;
