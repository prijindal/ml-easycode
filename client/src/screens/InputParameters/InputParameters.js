/* @flow */
import injectSheet, { type JSSProps } from 'react-jss';
import * as React from 'react';
import InputParametersButtons from '../../components/InputParametersButtons';
import InputParametersList from '../../components/InputParametersList';
import Loading from '../../components/Loading';
import NeuralNetworkDiagram from '../../components/NeuralNetworkDiagram';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: '0 auto',
    maxWidth: 960,
    paddingBottom: '72px',
  },
};

export type InputParametersScreenProps = {
  runCode?: () => { type: string }, // TODO
  downloadCode?: () => { type: string }, // TODO
  templateid: string,
  data: {
    template: {
      parameters: any,
    },
    loading: boolean,
  },
  history: any, // TODO: Better type
};

class InputParametersScreen extends React.Component<
  InputParametersScreenProps & JSSProps<typeof styles>,
  null
> {
  static defaultProps = {
    history: {
      push: (a: string) => ({}),
    },
  };

  componentWillMount() {
    // if(this.props.templateid == null || this.props.templateid === "") {
    //   this.props.history.push('/')
    // }
  }

  shouldComponentUpdate(newProps: InputParametersScreenProps, newState) {
    const { data, templateid } = newProps;
    const { template } = data;
    if (templateid == null || template == null) {
      this.props.history.push('/');
      return false;
    }
    return true;
  }

  goToTraining = () => {
    this.props.history.push('/training');
  };

  render() {
    const { classes, data } = this.props;
    const {
      // template,
      loading,
    } = data;
    if (loading) {
      return <Loading />;
    }
    // console.log(template.parameters);
    return (
      <div className={classes.root}>
        <InputParametersList />
        <NeuralNetworkDiagram />
        <InputParametersButtons goToTraining={this.goToTraining} />
      </div>
    );
  }
}

export default injectSheet(styles)(InputParametersScreen);
