import { Toolbar } from 'material-ui';
import { WithStyles, withStyles } from 'material-ui/styles';
import * as React from 'react';
import StepperBarStep from './StepperBarStep';

const decorate = withStyles((theme) => ({
  root: {
    maxWidth: 960,
    display: 'flex',
    justifyContent: 'center',
    margin: "0 auto",
  },
  stepper: {
    display: 'flex',
    flexDirection: 'row' as 'row',
  },
}));

export interface StepperBarComponentProps {};

class StepperBarComponent extends React.PureComponent<StepperBarComponentProps & WithStyles<'root' | 'stepper'>, null> {
  public render() {
    const {classes } = this.props;    
    return (
      <div className={classes.root}>
        <Toolbar>
          <div className={classes.stepper}>
            <StepperBarStep
              stepnumber={1}
              text="Choose a template"
              state="done"
            />
            <StepperBarStep
              stepnumber={2}
              text="Fine Tune Your parameters"
              state="active"
            />
            <StepperBarStep
              stepnumber={3}
              text="Run your model"
              state="pending"              
              divider={false}
            />
          </div>
        </Toolbar>
      </div>
    );
  }
}

export default decorate<StepperBarComponentProps>(StepperBarComponent);
