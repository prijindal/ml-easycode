/* @flow */
import * as React from 'react';
import Worker from 'worker-loader!./background.worker'; // eslint-disable-line import/no-webpack-loader-syntax

import TrainingComponent, {
  type TrainingPageProps,
  type Logs,
} from './TrainingComponent';

class TrainingPage extends React.Component<any, TrainingPageProps> {
  state: TrainingPageProps = {
    chartData: {
      mse: [[], []],
      loss: [[], []],
      acc: [[], []],
    },
    epochs: 200,
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
    testinputs: [[1, 2]],
    values: [],
  };

  worker: Worker;

  reduceChartData = (
    prevChartData: number[][],
    epoch: number,
    logs: Logs,
    key: string
  ) => {
    return [
      [
        ...prevChartData[0],
        {
          x: epoch + 1,
          y: isNaN(logs[`val_${key}`]) ? 1e40 : logs[`val_${key}`] * 100,
        },
      ],
      [
        ...prevChartData[1],
        {
          x: epoch + 1,
          y: isNaN(logs[key]) ? 1e40 : logs[key] * 100,
        },
      ],
    ];
  };

  componentWillMount() {
    // setTimeout(this.trainNetwork, 500);
    this.worker = new Worker();
    this.worker.postMessage({
      type: 'generateNumbers',
      length: 10,
    });
    this.worker.addEventListener('message', ({ data: { type, ...data } }) => {
      if (type === 'generated') {
        this.setState({
          testinputs: data.numbers,
        });
        this.worker.postMessage({
          type: 'train',
          epochs: this.state.epochs,
          testinputs: data.numbers,
        });
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
          // maxY: (epoch%(this.state.epochs/10) === 0 && epoch > 0) ? prevState.chartData[0].slice(prevState.chartData[0].length - this.state.epochs/10)[0].y : prevState.maxY,
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
        toggleTestCases={this.toggleTestCases}
      />
    );
  }
}

export default TrainingPage;
