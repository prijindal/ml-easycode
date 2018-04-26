/* @flow */

import { connect } from 'react-redux';
import { type State } from '../../store/state.type';
import { type Dispatch } from 'redux';

const mapStateToProps = (state: State) => ({
  templateid: state.selectedtemplate
})

export default connect(
  mapStateToProps,
  (dispatch: Dispatch<any>) => ({
    fetchParameters: (t: string) => ({}),
  })
);
