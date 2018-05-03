/* @flow */

import { connect } from 'react-redux';

import { Creators } from '../../store/parameters';
import { type State } from '../../store/state.type';

const mapStateToProps = (state: State) => ({
  parameters: state.parameters,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setParameters: parameters => dispatch(Creators.setParameters(parameters)),
  changeProperty: (parametername: string, parametervalue: any) =>
    dispatch(Creators.setParameter(parametername, parametervalue)),
});

export default connect(mapStateToProps, mapDispatchToProps);
