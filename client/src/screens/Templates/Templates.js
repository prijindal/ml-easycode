/* @flow */

import { withStyles, WithStyles } from 'material-ui/styles';
import * as React from 'react';

import { RouterAction } from 'react-router-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import TemplatesGrid from '../../components/TemplatesGrid';
import { type Template } from '../../models/template';
import prefetchedData from '../../api/templates.json';

const decorate = withStyles(({ palette, spacing }) => ({
  root: {
    maxWidth: 960,
    margin: '0 auto',
  },
}));

type TemplatePageProps = {
  setSearch: (s: string) => { type: string },
  selectTemplate: (s: Template) => RouterAction,
  search: string,
  data: {
    templates: Template[],
    loading: boolean,
  },
};

class TemplatesPage extends React.PureComponent<
  TemplatePageProps & WithStyles<'root'>,
  any
> {
  onTemplateSelected = (template: Template): void => {
    this.props.selectTemplate(template);
  };

  render() {
    let { data } = this.props;
    if (!data.templates) {
      data.templates = prefetchedData.data.templates;
    }
    return (
      <div className={this.props.classes.root}>
        <SearchBar
          search={this.props.search}
          setSearch={this.props.setSearch}
        />
        <TemplatesGrid
          templates={data.templates}
          onTemplateSelected={this.onTemplateSelected}
        />
      </div>
    );
  }
}

export default decorate(TemplatesPage);
