/* @flow */


import { WithStyles, withStyles } from 'material-ui/styles';
import * as React from 'react';
import InputParametersButtons from '../../components/InputParametersButtons';
import InputParametersList from '../../components/InputParametersList';
import NeuralNetworkDiagram from '../../components/NeuralNetworkDiagram';

const decorate = withStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: '0 auto',
    maxWidth: 960,
    paddingBottom: '72px'
  },
}));

export type InputParametersScreenProps = {
  fetchParameters: (t: string) => ({ type: string });
  runCode?: () => ({type: string}); // TODO
  downloadCode?: () => ({type: string}); // TODO
  templateid: string;
  parameters?: any; // TODO
  isLoading?: boolean; // TODO
  history: any; // TODO: Better type
};

class InputParametersScreen extends React.PureComponent<InputParametersScreenProps & WithStyles<'root'>, null> {
  static defaultProps = {
    history: {
      push: (a: string) => ({}),
    },
  }

  componentWillMount() {
    // if(this.props.templateid == null || this.props.templateid === "") {
    //   this.props.history.push('/')
    // }
    this.props.fetchParameters(this.props.templateid);
  }

  goToTraining = () => {
    this.props.history.push('/training');
  }

  render() {
    const { classes } = this.props;    
    return (
      <div className={classes.root}>
        <InputParametersList />
        <NeuralNetworkDiagram />
        <InputParametersButtons goToTraining={this.goToTraining}/>
      </div>
    );
  }
}

export default decorate(InputParametersScreen);
