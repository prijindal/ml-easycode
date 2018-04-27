import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';
import * as React from 'react';

import Graph from './Graph';
import SampleTestInputs from './SampleTestInputs';

const decorate = withStyles((theme) => ({
  root: {
    maxWidth: 960,
    margin: '0 auto',
  },
  graphs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'    
  },
  actions: {
    margin: '0 20px'
  },
  progress: {
    marginBottom: 20
  }
}))

export type Logs = {
  MSE: number,
  acc: number,
  loss: number,
  val_MSE: number,
  val_acc: number,
  val_loss: number,
}

export type TrainingPageProps = {
  chartData: {
    mse: number[][],
    loss: number[][],
    acc: number[][]
  },
  epochs: number;
  isTraining: boolean;
  logs: Logs,
  isWaiting: boolean,
  progress: number,
  showTestCases: boolean,
  testinputs: number[][],
  values: number[],
  classes: decorate.classes,
  toggleTestCases: () => void,
  downloadModel: () => void
}

class CustomSnackBar extends React.Component<{ open: boolean }, any> {
  state = {
    open: this.props.open
  }

  hideSnackBar = () => {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={2000}
        onClose={this.hideSnackBar}
        message={<span>Training completed</span>}
      />
    )
  }
}

const TrainingComponent = decorate(({
  classes,
  isTraining,
  showTestCases,
  testinputs,
  values,
  epochs,
  progress,
  logs,
  chartData,
  toggleTestCases,
  downloadModel,
}: TrainingPageProps) => (
  <div className={classes.root}>
    <div className={classes.graphs}>
      {/* <Graph
        axisLabels={{x: 'No. of Epochs', y: 'Mean Squared Error'}}
        chartData={chartData.mse}
        legends={[
          'Validation Mean Squared Error',
          'Mean Squared Error'
        ]}
        testing={logs.MSE}
        validation={logs.val_MSE}
      /> */}
      <Graph
        axisLabels={{x: 'No. of Epochs', y: 'Loss'}}
        chartData={chartData.loss}
        legends={[
          'Validation Loss',
          'Loss'
        ]}
        testing={logs.loss}
        validation={logs.val_loss}
      />
      <Graph
        axisLabels={{x: 'No. of Epochs', y: 'Accuracy'}}
        chartData={chartData.acc}
        legends={[
          'Validation Accuracy',
          'Accuracy'
        ]}
        testing={logs.acc}
        validation={logs.val_acc}
      />
    </div>
    <div className={classes.actions}>
      <LinearProgress className={classes.progress} variant="determinate" value={isTraining ? (progress*100/epochs) : 100} />
      <Button disabled={isTraining} onClick={downloadModel}>
        {isTraining ? "Training in progress" : "Download Model"}
      </Button>
      <SampleTestInputs
        testinputs={testinputs}
        showTestCases={showTestCases}
        toggleTestCases={toggleTestCases}
        values={values}
      />
      {!isTraining &&
        <CustomSnackBar open={!isTraining}/>
      }
    </div>
  </div>
))

export default TrainingComponent;
