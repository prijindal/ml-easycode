/* @flow */

import Button from 'material-ui/Button';
import * as React from 'react';
import { Legend, LineChart } from 'react-easy-chart';
import Worker from 'worker-loader!./background.worker'; // eslint-disable-line import/no-webpack-loader-syntax

class TrainingPage extends React.Component<any, any> {
  state: any = {
    chartData: [[], []],
    epochs: 200,
    isTraining: true,
    logs: {
      MSE: 0,
      acc: 0,
      loss: 0,
      val_MSE:0,
      val_acc: 0,
      val_loss: 0
    },
    // maxY: 100,
    progress: 0,
    showTestCases: false,
    testinputs: [[1,2]],    
    values: 0
  }

  worker: Worker;

  componentWillMount() {
    // setTimeout(this.trainNetwork, 500);
    this.worker = new Worker();
    this.worker.postMessage({
      type: 'generateNumbers',
      length: 10,
    })
    this.worker.addEventListener('message', ({ data: { type, ...data } }) => {
      if (type === "generated") {
        this.setState({
          testinputs: data.numbers
        })
        this.worker.postMessage({
          type: 'train',
          epochs: this.state.epochs,
          testinputs: data.numbers
        });
      } else if (type === "trainingepochend") {
        const { epoch, logs, values } = data;
        this.setState((prevState:any) => ({
          chartData: [
            [
              ...prevState.chartData[0],
              {
                x: epoch + 1,
                y: isNaN(logs.val_MSE) ? 1e40 : logs.val_MSE*100
              }
            ],
            [
              ...prevState.chartData[1],
              {
                x: epoch + 1,
                y: isNaN(logs.MSE) ? 1e40 : logs.MSE*100
              }
            ],
          ],
          logs,
          // maxY: (epoch%(this.state.epochs/10) === 0 && epoch > 0) ? prevState.chartData[0].slice(prevState.chartData[0].length - this.state.epochs/10)[0].y : prevState.maxY,
          progress: epoch,
          values
        }))
      } else if (type === "trainingcompleted") {
        this.setState({
          isTraining: false,
          values: data.values
        })
      }
    })
  }
  
  toggleTestCases = () => {
    this.setState((prevState: any) => ({
      showTestCases: !prevState.showTestCases
    }))
  }

  getX = (x:any) => x.index

  render() {
    return (
      <div style={{margin: '10px'}}>
        <div>
		  {this.state.isTraining ? 
			<div>{Math.floor(this.state.progress*100/this.state.epochs)} %</div> :
			<div>Completed Training</div>
		  }
          <Button onClick={this.toggleTestCases}>Toggle Test Cases</Button>
          {this.state.showTestCases ? 
			  <table className="mui-table">
				<thead>
				  <tr>
					<td>Test inputs</td>
					<td>Actual Value</td>
					<td>Test Predictions</td>
				  </tr>
				</thead>
				<tbody>
				  {this.state.testinputs.map((testinput:number[], index:number) => 
					<tr key={index}>
					  <td>{testinput[0]} + {testinput[1]}</td>
					  <td>{testinput[0] + testinput[1]}</td>
					  <td>{this.state.values[index]}</td>
					</tr>
				  )}
				</tbody>
			  </table> : <div />
			}
        </div>
        <div>
          <label>Mean Squared Error</label>
          <div>Testing: {this.state.logs.MSE.toString()}</div>
          <div>Validation: {this.state.logs.val_MSE.toString()}</div>
          {/* <div>{this.state.logs.loss.toString()}</div>
          <div>{this.state.logs.val_loss.toString()}</div> */}
        </div>
        <div>
          <LineChart
            // yDomainRange={[0, this.state.maxY]}
            height={200}
            width={340}
            axes={true}
            lineColors={['#e3a51a', '#3f4c55']}
            axisLabels={{x: 'No. of Epochs', y: 'Mean Squared Error'}}
            data={this.state.chartData}
          />
          <Legend
            data={[
              {key: 'Validation Mean Squared Error', color: '#3f4c55'},
              {key: 'Mean Squared Error', color: '#e3a51a'},
            ]}
            dataId={'key'}
            config={[
              {'color': '#3f4c55'},
              {'color': '#e3a51a'},
            ]}
          />
        </div>
      </div>
    )
  }
}

export default TrainingPage;
