import { connect } from 'react-redux';
import { filterTemplates } from '../../helpers/string';
import { Creators } from '../../store/search';
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
    setSearch: (term: string) => dispatch(Creators.setSearch(term)),    
  })
);
