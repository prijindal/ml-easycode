/* @flow */

import { AppBar, Button, Toolbar } from 'material-ui';
import * as React from 'react';
import styles from './styles.css';

export type InputParametersButtonsProps = {
  goToTraining: () => void,
};

class InputParametersButtons extends React.PureComponent<
  InputParametersButtonsProps,
  null
> {
  downloadCode = () => {
    alert('Downloaded');
  };
  render() {
    return (
      <AppBar position="fixed" color="default" className={styles.root}>
        <Toolbar className={styles.toolbar}>
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

export default InputParametersButtons;
