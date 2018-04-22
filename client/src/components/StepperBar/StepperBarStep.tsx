import DoneIcon from '@material-ui/icons/Done';
import { Hidden, Typography } from 'material-ui';
import { withStyles, WithStyles } from 'material-ui/styles';
import * as React from 'react';

const decorate = withStyles((theme) => ({
  step: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    paddingLeft: 12,
    flexWrap: 'wrap' as 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 72
  },
  doneicon: {
    fontSize: 20
  },
  stepnumber: {
    backgroundColor: theme.palette.primary.light,
    color: '#FFFFFF',
    borderRadius: '50%',
    fontWeight: 'normal' as 'normal',
    fontSize: 12,
    lineHeight: 24,
    marginRight: 8,
    width: 24,
    height: 24,
    textAlign: 'center' as 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  steptext: {
    fontWeight: 'normal' as 'normal',
    fontSize: 14,
    textAlign: 'center' as 'center',
  },
  horizontaldivider: {
    width: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.37)',
    height: 1,
    marginLeft: '0.5em',
  },
}));

const colorBuilder = (color: string, alpha: number) => {
  return `rgba(${color}, alpha)`;
}

interface StepperBarStepProps {
  stepnumber: number;
  text: string;
  desktopText?: string;
  divider?: boolean;
  state?: "active" | "done" | "pending"
}

class StepperBarStep extends React.PureComponent<StepperBarStepProps & WithStyles<'step' | 'stepnumber' | 'steptext' | 'horizontaldivider' | 'doneicon'>, null> {
  public static defaultProps: Partial<StepperBarStepProps> = {
    divider: true,
    state: "pending",
  }

  public render() {
    const { classes, stepnumber, text, divider, state, desktopText } = this.props;    
    return (
      <div className={classes.step}>
        <Typography
          variant="subheading"
          className={classes.stepnumber}
          style={{
            fontWeight: state === "done" ? ("bold") : ("normal"),
            backgroundColor: state === "pending" ? 'rgba(0,0,0, 0.38)' : "#7986cb"
          }}
        >
          {state === "done" ?
            <DoneIcon className={classes.doneicon}/> :          
            stepnumber
          }
        </Typography>
        <Typography
          variant="subheading"
          className={classes.steptext}
          style={{
            color:colorBuilder('255,255,255', state === "done" ? 1.0 : 0.54),
            fontWeight: state === "pending" ? ("normal") : ("bold"),
          }}
        >
          <Hidden smDown>
            {desktopText || text}
          </Hidden>
          <Hidden smUp>
            {text}
          </Hidden>
        </Typography>
        <Hidden smDown>
          {divider &&
            <div className={classes.horizontaldivider}/>
          }
        </Hidden>
      </div>
    );
  }
}

export default decorate<StepperBarStepProps>(StepperBarStep);
