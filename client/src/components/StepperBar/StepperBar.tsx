import { AppBar, Toolbar } from 'material-ui';
import { WithStyles, withStyles } from 'material-ui/styles';
import * as React from 'react';
import StepperBarStep from './StepperBarStep';

const decorate = withStyles((theme) => ({
  root: {
    marginBottom: 20
  },
  stepper: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    width: 960,
    justifyContent: 'flex-start',
    margin: "0 auto",
  },
}));

export interface StepperBarComponentProps {};

class StepperBarComponent extends React.PureComponent<StepperBarComponentProps & WithStyles<'root' | 'stepper'>, null> {
  public render() {
    const {classes } = this.props;    
    return (
      <AppBar position="sticky" color="default" className={classes.root}>
        <Toolbar>
          <div className={classes.stepper}>
            <StepperBarStep
              stepnumber={1}
              text="Select template"
              desktopText="Select a template"
              state="active"
            />
            <StepperBarStep
              stepnumber={2}
              text="Fine Tune"
              desktopText="Fine Tune the parameters"
              state="pending"
            />
            <StepperBarStep
              stepnumber={3}
              text="Run It!"
              desktopText="Run your model"
              state="pending"              
              divider={false}
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default decorate<StepperBarComponentProps>(StepperBarComponent);
