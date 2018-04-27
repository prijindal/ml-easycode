/* @flow */

import { withStyles, WithStyles } from 'material-ui/styles';
import * as React from 'react';

import { RouterAction } from 'react-router-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import TemplatesGrid from '../../components/TemplatesGrid';
import { type Template } from '../../models/template';

const decorate = withStyles(({ palette, spacing }) => ({
  root: {
    maxWidth: 960,
    margin: '0 auto',
  },
}));

type TemplatePageProps = {
  fetchTemplates: () => { type: string };
  setSearch: (s: string) => { type: string };
  selectTemplate: (s: Template) => RouterAction;
  templates: Template[];
  search: string;
  isLoading: boolean;
}

class TemplatesPage extends React.PureComponent<TemplatePageProps & WithStyles<'root'>, any> {
  static defaultProps = {
    fetchTemplates: () => ({}),
  }
  componentWillMount() {
    this.props.fetchTemplates();
  }

  onTemplateSelected = (template: Template):void => {
    this.props.selectTemplate(template);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <SearchBar
          search={this.props.search}
          setSearch={this.props.setSearch}
        />
        <TemplatesGrid
          templates={this.props.templates}
          onTemplateSelected={this.onTemplateSelected}
        />
      </div>
    )
  }
}

export default decorate(TemplatesPage);
