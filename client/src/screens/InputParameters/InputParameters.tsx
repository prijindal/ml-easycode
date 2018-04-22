import { Button } from 'material-ui';
import { withStyles, WithStyles } from 'material-ui/styles';
import * as React from 'react';

const decorate = withStyles((theme) => ({
  root: {},
}));

export interface InputParametersScreenProps {
  fetchParameters: (t: string) => ({ type: string });
  runCode?: () => ({type: string}); // TODO
  downloadCode?: () => ({type: string}); // TODO
  templateid: string;
  parameters?: any; // TODO
  isLoading?: boolean; // TODO
  history?: any; // TODO: Better type
};

class InputParametersScreen extends React.PureComponent<InputParametersScreenProps & WithStyles<'root'>, null> {
  public componentWillMount() {
    if(this.props.templateid == null || this.props.templateid === "") {
      this.props.history.push('/')
    }
    this.props.fetchParameters(this.props.templateid);
  }

  public goToTraining = () => {
    this.props.history.push('/training');
  }

  public render() {
    const {classes } = this.props;    
    return (
      <div className={classes.root}>
        {this.props.templateid}
        <div>
          <Button onClick={this.goToTraining}>
            Go To Training
          </Button>
        </div>
      </div>
    );
  }
}

export default decorate<InputParametersScreenProps>(InputParametersScreen);
