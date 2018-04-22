import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filterTemplates } from '../../helpers/string';
import { Template } from '../../models/template';
import { Creators as searchCreators } from '../../store/search';
import { Creators as selectedtemplateCreators } from '../../store/selectedtemplate';
import { State } from '../../store/state.type';
import templates from '../../store/templates';

const mapStateToProps = (state: State) => ({
  isLoading: state.templates.isLoading,
  search: state.search,
  templates: filterTemplates(state.templates.data, state.search),
})

export default connect(
  mapStateToProps,
  dispatch => ({
    fetchTemplates: () => dispatch(templates.start()),
    setSearch: (term: string) => dispatch(searchCreators.setSearch(term)),    
    selectTemplate: (template: Template) => {
      dispatch(selectedtemplateCreators.setTemplate(template.id));
      return dispatch(push('/inputs'))
    },
  })
);
