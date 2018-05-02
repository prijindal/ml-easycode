/* @flow */

import { connect } from 'react-redux';

import { Creators } from '../../store/parameters';
import { type State } from '../../store/state.type';

const mapStateToProps = (state: State) => ({
  parameters: state.parameters,
});

const mapDispatchToProps = dispatch => ({
  setParameters: parameters => dispatch(Creators.setParameters(parameters)),
});

export default connect(mapStateToProps, mapDispatchToProps);
