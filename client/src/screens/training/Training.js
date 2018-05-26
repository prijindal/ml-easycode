/* @flow */
import * as React from 'react';
import _ from 'lodash';
import TFWorker from 'worker-loader!./background.worker'; // eslint-disable-line import/no-webpack-loader-syntax

import TrainingComponent, { type Logs } from './TrainingComponent';

class TrainingPage extends React.Component<any, any> {
  state = {
    chartData: {
      mse: [[], []],
      loss: [[], []],
      acc: [[], []],
    },
    isTraining: true,
    logs: {
      MSE: 0,
      acc: 0,
      loss: 0,
      val_MSE: 0,
      val_acc: 0,
      val_loss: 0,
    },
    // maxY: 100,
    progress: 0,
    showTestCases: false,
    testX: [[1, 2]],
    testY: [[1]],
    values: [],
  };

  worker: Worker;

  reduceChartData = (
    prevChartData: number[][],
    epoch: number,
    logs: Logs,
    key: string
  ): any => {
    const newChartData = [
      ...prevChartData,
      [
        epoch + 1,
        isNaN(logs[`val_${key}`]) ? 1e40 : logs[`val_${key}`] * 100,
        isNaN(logs[key]) ? 1e40 : logs[key] * 100,
      ],
    ];
    return newChartData.filter(row => row.length > 0);
  };

  componentWillMount() {
    // setTimeout(this.trainNetwork, 500);
    if (_.isEmpty(this.props.parameters)) {
      this.props.history.push('/');
      return;
    }
    this.worker = new TFWorker();
    this.worker.postMessage({
      type: 'train',
      trainfile: this.props.trainfile,
      parameters: this.props.parameters,
      length: 10,
    });
    this.worker.addEventListener('message', (event: any) => {
      const {
        data: { type, ...data },
      } = event;
      if (type === 'readdatasuccess') {
        const { testX, testY } = data;
        this.setState({
          testX,
          testY,
        });
        // this.worker.postMessage({
        //   type: 'train',
        //   parameters: this.props.parameters,
        //   testinputs: data.testdata,
        // });
      } else if (type === 'trainingepochend') {
        const { epoch, logs, values } = data;
        this.setState((prevState: any) => ({
          chartData: {
            loss: this.reduceChartData(
              prevState.chartData.loss,
              epoch,
              logs,
              'loss'
            ),
            mse: this.reduceChartData(
              prevState.chartData.mse,
              epoch,
              logs,
              'MSE'
            ),
            acc: this.reduceChartData(
              prevState.chartData.acc,
              epoch,
              logs,
              'acc'
            ),
          },
          logs,
          progress: epoch,
          values,
        }));
      } else if (type === 'trainingcompleted') {
        this.setState({
          isTraining: false,
          values: data.values,
        });
      }
    });
  }

  toggleTestCases = () => {
    this.setState((prevState: any) => ({
      showTestCases: !prevState.showTestCases,
    }));
  };

  render() {
    return (
      <TrainingComponent
        {...this.state}
        parameters={this.props.parameters}
        toggleTestCases={this.toggleTestCases}
      />
    );
  }
}

export default TrainingPage;
