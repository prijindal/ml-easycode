/* @flow */

import { AppBar, Button, Toolbar } from 'material-ui';
import * as React from 'react';
import injectSheet, { type JSSProps } from 'react-jss';

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 72,
    top: 'initial',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    width: 960,
    justifyContent: 'flex-start',
    margin: '0 auto',
  },
};

export type InputParametersButtonsProps = {
  goToTraining: () => void,
};

class InputParametersButtons extends React.PureComponent<
  InputParametersButtonsProps & JSSProps<typeof styles>,
  null
> {
  downloadCode = () => {
    alert('Downloaded');
  };
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed" color="default" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Button onClick={this.props.goToTraining} variant="raised">
            Run Code
          </Button>
          <Button onClick={this.downloadCode} variant="raised">
            Download Code
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default injectSheet(styles)(InputParametersButtons);
