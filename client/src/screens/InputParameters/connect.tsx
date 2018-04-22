import { connect } from 'react-redux';
import { State } from '../../store/state.type';

const mapStateToProps = (state: State) => ({
  templateid: state.selectedtemplate
})

export default connect(
  mapStateToProps,
  dispatch => ({
    fetchParameters: (t: string) => ({}),
  })
);
