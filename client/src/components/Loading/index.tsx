import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import * as React from 'react';

const decorate = withStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
  },
}));

const Loading = decorate<{}>(({ classes }) => (
  <div className={classes.root}>
    <CircularProgress />
  </div>
))

export default Loading;
