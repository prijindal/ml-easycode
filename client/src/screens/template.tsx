import Button from 'material-ui/Button';
import * as React from 'react';
import { connect } from 'react-redux';

import { filterTemplates } from '../helpers/string';
import { Template } from '../models/template';
import templates from '../store/templates';

interface TemplatePageProps {
  fetchTemplates: () => { type: string };
  templates: Template[];
  search: string;
  isLoading: boolean;
}

class TemplatePage extends React.PureComponent<TemplatePageProps, any> {
  public componentWillMount() {
    this.props.fetchTemplates();
  }

  public render() {
    return (
      <div>
        <Button>Ok</Button>
        {this.props.templates.map(
          (i: Template) => (
            <span key={i.id}>{i.title}</span>
          )
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isLoading: state.templates.isLoading,
  search: state.search,
  templates: filterTemplates(state.templates.data, state.search),
})

export default connect(
  mapStateToProps,
  dispatch => ({
    fetchTemplates: () => dispatch(templates.start()),
  })
)(TemplatePage);
