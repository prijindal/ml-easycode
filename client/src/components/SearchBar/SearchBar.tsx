import Input from 'material-ui/Input';
import { withStyles, WithStyles } from 'material-ui/styles';
import * as React from 'react';

const decorate = withStyles((theme) => ({
  root: {
    padding: '0 20px',
    marginBottom: 20
  },
  searchinput: {
    width: '100%'
  }
}));

export interface SearchBarComponentProps {
  search: string;
  setSearch: (e: string) => { type: string };
};

class SearchBarComponent extends React.PureComponent<SearchBarComponentProps & WithStyles<'root' | 'searchinput'>, null> {
  public onChange = (e: Event | any) => this.props.setSearch(e.target.value);

  public render() {
    const {classes, search} = this.props;    
    return (
      <div className={classes.root}>
        <Input
          className={classes.searchinput}
          id="search"
          placeholder="Search"
          type="search"
          value={search}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default decorate<SearchBarComponentProps>(SearchBarComponent);
