/* @flow */

import { connect } from 'react-redux';
import { type State } from '../../store/state.type';

const mapStateToProps = (state: State) => ({
  templateid: state.selectedtemplate
})

export default connect(
  mapStateToProps,
);
