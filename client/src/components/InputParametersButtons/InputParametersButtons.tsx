import { AppBar, Button, Toolbar } from 'material-ui';
import { WithStyles, withStyles } from 'material-ui/styles';
import * as React from 'react';

const decorate = withStyles((theme) => ({
  root: {
    position: 'fixed' as 'fixed',
    bottom: 0,
    width: '100%',
    height: 72,
    top: 'initial',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    width: 960,
    justifyContent: 'flex-start',
    margin: "0 auto",
  }
}));

export interface InputParametersButtonsProps {
  goToTraining: () => void;
};

class InputParametersButtons extends React.PureComponent<InputParametersButtonsProps & WithStyles<'root' | 'toolbar'>, null> {

  public render() {
    const { classes } = this.props;    
    return (
      <AppBar position="fixed" color="default" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Button onClick={this.props.goToTraining} variant="raised">
            Run Code
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default decorate<InputParametersButtonsProps>(InputParametersButtons);
