
import { WithStyles, withStyles } from 'material-ui/styles';
import * as React from 'react';
import InputParametersButtons from '../../components/InputParametersButtons';
import InputParametersList from '../../components/InputParametersList';;
import Loadable from 'react-loadable';
import Loading from '../../components/Loading';

const decorate = withStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    justifyContent: 'space-evenly',
    margin: '0 auto',
    maxWidth: 960,
    paddingBottom: '72px'
  },
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

const NeuralNetworkDiagramComponent = Loadable({
  loader: () => import('../../components/NeuralNetworkDiagram'),
  loading: () => (
    <div style={{minWidth: 320, flex: 1}}>
      <Loading />
    </div>
  ),
})

class InputParametersScreen extends React.PureComponent<InputParametersScreenProps & WithStyles<'root'>, null> {
  public componentWillMount() {
    // if(this.props.templateid == null || this.props.templateid === "") {
    //   this.props.history.push('/')
    // }
    this.props.fetchParameters(this.props.templateid);
  }

  public goToTraining = () => {
    this.props.history.push('/training');
  }

  public render() {
    const { classes } = this.props;    
    return (
      <div className={classes.root}>
        <InputParametersList />
        <NeuralNetworkDiagramComponent />
        <InputParametersButtons goToTraining={this.goToTraining}/>
      </div>
    );
  }
}

export default decorate<InputParametersScreenProps>(InputParametersScreen);
