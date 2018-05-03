/* @flow */
import injectSheet, { type JSSProps } from 'react-jss';
import * as React from 'react';
import InputParametersButtons from '../../components/InputParametersButtons';
import InputParametersList from '../../components/InputParametersList';
import Loading from '../../components/Loading';
import NeuralNetworkDiagram from '../../components/NeuralNetworkDiagram';

import { type Parameters } from '../../models/parameters';

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
  setParameters: (parameters: Parameters) => { type: string },
  templateid: string,
  data: {
    template: {
      parameters: Parameters,
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
    this.checkProps(this.props);
  }

  checkProps(props) {
    const { templateid } = props;
    if (templateid == null || templateid === '') {
      this.props.history.push('/');
      return false;
    }
    return true;
  }

  shouldComponentUpdate(newProps: InputParametersScreenProps, newState) {
    return this.checkProps(newProps);
  }

  goToTraining = () => {
    this.props.history.push('/training');
  };

  render() {
    let { classes, data } = this.props;
    const {
      // template,
      loading,
      error,
    } = data;
    if (loading || error) {
      return <Loading />;
    }
    if (!data.template) {
      data.template = {
        initializer: 'GLOROT_UNIFORM',
        optimizer: { function: 'SGD', __typename: 'Optimizer' },
        hiddenlayers: [],
        outputlayer: {
          __typename: 'Layer',
          id: 'cjgq8joc4111c0111yvj651o5',
          nodes: 4,
          activationFunction: 'SIGMOID',
          type: 'INPUT',
        },
      };
    }
    // console.log(template.parameters);
    return (
      <div className={classes.root}>
        <InputParametersList data={data} />
        <NeuralNetworkDiagram />
        <InputParametersButtons goToTraining={this.goToTraining} />
      </div>
    );
  }
}

export default injectSheet(styles)(InputParametersScreen);
