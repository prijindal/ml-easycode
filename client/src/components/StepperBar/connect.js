/* @flow */

import { connect } from 'react-redux';
import { type State } from '../../store/state.type';

const mapStateToProps = (state: State) => ({
  router: state.router,
});

export default connect(mapStateToProps);
