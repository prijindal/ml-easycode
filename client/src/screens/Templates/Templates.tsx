import { withStyles, WithStyles } from 'material-ui/styles';
import * as React from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import TemplatesGrid from '../../components/TemplatesGrid';
import { Template } from '../../models/template';

const decorate = withStyles(({ palette, spacing }) => ({
  root: {
    maxWidth: 960,
    margin: '0 auto',
  },
}));

interface TemplatePageProps {
  fetchTemplates: () => { type: string };
  setSearch: (s: string) => { type: string };
  templates: Template[];
  search: string;
  isLoading: boolean;
}

class TemplatesPage extends React.PureComponent<TemplatePageProps & WithStyles<'root'>, any> {
  public componentWillMount() {
    this.props.fetchTemplates();
  }

  public onTemplateSelected():void {
    
  }

  public render() {
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

export default decorate<TemplatePageProps>(TemplatesPage);
