import { connect } from 'react-redux';

import { filterTemplates } from '../../helpers/string';
import { Template } from '../../models/template';
import templates from '../../store/templates';

// TODO: Move this to store folder
interface State {
  templates: {
    isLoading: boolean,
    data: Template[]
  };
  search: any;
}

const mapStateToProps = (state: State) => ({
  isLoading: state.templates.isLoading,
  search: state.search,
  templates: filterTemplates(state.templates.data, state.search),
})

export default connect(
  mapStateToProps,
  dispatch => ({
    fetchTemplates: () => dispatch(templates.start()),
  })
);
