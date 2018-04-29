/* @flow */

import { AppBar, Toolbar } from 'material-ui';
import { WithStyles, withStyles } from 'material-ui/styles';
import * as React from 'react';
import { RouterState } from 'react-router-redux';
import StepperBarStep from './StepperBarStep';

const decorate = withStyles(theme => ({
  root: {
    marginBottom: 20,
  },
  stepper: {
    display: 'flex',
    flexDirection: 'row',
    width: 960,
    justifyContent: 'flex-start',
    margin: '0 auto',
  },
}));

export type StepperBarComponentProps = {
  router: RouterState,
};

class StepperBarComponent extends React.PureComponent<
  StepperBarComponentProps & WithStyles<'root' | 'stepper'>,
  null
> {
  static defaultProps = {
    router: {
      location: null,
    },
  };

  getState = (stepnumber: number): 'active' | 'pending' | 'done' => {
    const {
      router: { location },
    } = this.props;
    if (location === null) {
      return 'pending';
    }
    const { pathname } = location;
    if (pathname === '/') {
      if (stepnumber === 1) {
        return 'active';
      } else {
        return 'pending';
      }
    }
    if (pathname === '/inputs') {
      if (stepnumber < 2) {
        return 'done';
      } else if (stepnumber === 2) {
        return 'active';
      } else {
        return 'pending';
      }
    }
    if (pathname === '/training') {
      if (stepnumber < 3) {
        return 'done';
      } else {
        return 'active';
      }
    }
    return 'pending';
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky" color="default" className={classes.root}>
        <Toolbar>
          <div className={classes.stepper}>
            <StepperBarStep
              stepnumber={1}
              text="Select template"
              desktopText="Select a template"
              state={this.getState(1)}
            />
            <StepperBarStep
              stepnumber={2}
              text="Fine Tune"
              desktopText="Fine Tune the parameters"
              state={this.getState(2)}
            />
            <StepperBarStep
              stepnumber={3}
              text="Run It!"
              desktopText="Run your model"
              state={this.getState(3)}
              divider={false}
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default decorate(StepperBarComponent);
