/* @flow */

import { connect } from 'react-redux';

import { Creators } from '../../store/trainfile';
import { type State } from '../../store/state.type';

const mapStateToProps = (state: State) => ({
  parameters: state.parameters,
  trainfile: state.trainfile,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setTrainFile: file => dispatch(Creators.setFile(file)),
});

export default connect(mapStateToProps, mapDispatchToProps);
