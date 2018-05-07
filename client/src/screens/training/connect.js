/* @flow */

import { connect } from 'react-redux';

import { type State } from '../../store/state.type';

const mapStateToProps = (state: State) => ({
  parameters: state.parameters,
});

export default connect(mapStateToProps);
