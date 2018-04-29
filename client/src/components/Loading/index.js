/* @flow */

import { CircularProgress } from 'material-ui/Progress';
import * as React from 'react';
import injectSheet, { type JSSProps } from 'react-jss';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Loading = injectSheet(styles)(
  ({ classes }: JSSProps<typeof styles>): React$Element<any> => (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
);

export default Loading;
