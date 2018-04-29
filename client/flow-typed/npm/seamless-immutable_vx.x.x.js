import * as Immutable from 'seamless-immutable';

// Reusable Types

export type ImmutableStateType<S> = Immutable.ImmutableObjectMixin<S>;

export type ActionType<T> = T & { type?: string, payload?: T };

export type ReducerType<S, A> = (state: S, action: A) => S;

// Specific Types - this would be reducer specific

export type MyNestedState = {
  otherProp?: string,
  nested?: {
    propA?: string,
    propB?: string,
  },
};

export type MyNestedImmutableState = ImmutableStateType<MyNestedState>;
export type MyNestedAction = ActionType<MyNestedState>; // return { type?: string, payload?: MyNestedState }

export type MyNestedActionWithAddedProps = MyNestedAction & {
  propA?: string,
  propB?: string,
  otherProp?: string,
}; // return { type?: string, payload?: MyNestedState, propA?: string, propB?: string, otherProp?: string }

export type MyNestedReducer = ReducerType<
  MyNestedImmutableState,
  MyNestedActionWithAddedProps
>;

/* ------------- Initial State ------------- */

const initState: MyNestedState = {
  otherProp: 'bar',
  nested: {
    propA: 'A',
    propB: 'B',
  },
};

export const INITIAL_STATE: MyNestedImmutableState = Immutable.Immutable(
  initState
);

/* ------------- Reducers ------------- */

// User
export const mergePropA: MyNestedReducer = (state, { otherProp, propA }) =>
  state.merge({
    otherProp,
    nested: {
      ...state.nested,
      propA,
    },
  }); // should pass

export const mergePropB: MyNestedReducer = (state, { otherProp, propB }) =>
  state.merge({
    otherProp,
    nested: {
      ...state.nested,
      propB,
    },
  }); // should pass
