import { withStyles, WithStyles } from 'material-ui/styles';
import * as React from 'react';

const decorate = withStyles((theme) => ({
  root: {},
}));

export interface InputParametersScreenProps {
  templateid: string;
  history?: any;
};

class InputParametersScreen extends React.PureComponent<InputParametersScreenProps & WithStyles<'root'>, null> {
  public componentWillMount() {
    if(this.props.templateid == null || this.props.templateid === "") {
      this.props.history.push('/')
    }
  }
  public render() {
    const {classes } = this.props;    
    return (
      <div className={classes.root}>
        {this.props.templateid}
      </div>
    );
  }
}

export default decorate<InputParametersScreenProps>(InputParametersScreen);
