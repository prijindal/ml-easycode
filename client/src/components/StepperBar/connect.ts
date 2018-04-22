import { connect } from 'react-redux';
import { State } from '../../store/state.type';

const mapStateToProps = (state: State) => ({
  router: state.router,
})

export default connect(
  mapStateToProps,
);
