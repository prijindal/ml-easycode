/* @flow */

import Input from 'material-ui/Input';
import injectSheet, { type JSSProps } from 'react-jss';
import * as React from 'react';

const styles = {
  root: {
    padding: '0 20px',
    marginBottom: 20,
  },
  searchinput: {
    width: '100%',
  },
};

export type SearchBarComponentProps = {
  search: string,
  setSearch: (e: string) => { type: string },
};

class SearchBarComponent extends React.PureComponent<
  SearchBarComponentProps & JSSProps<typeof styles>,
  null
> {
  onChange = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    this.props.setSearch(e.currentTarget.value);
  };

  render() {
    const { classes, search } = this.props;
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

export default (injectSheet(styles)(SearchBarComponent): any);
