import * as tf from '@tensorflow/tfjs';
import Button from 'material-ui/Button';
import * as React from 'react';
import { Legend, LineChart } from 'react-easy-chart';

const HIGHEST = 10;

const generateNumbers = (N: number = 1000) => {
  const xs:number[][] = [];
  const ys:number[] = [];
  for (let i = 0;i < N; i+=1) {
    const a = Math.floor(Math.random() * HIGHEST)/HIGHEST;
    const b = Math.floor(Math.random() * HIGHEST)/HIGHEST;
    xs.push([a, b]);
    ys.push(a + b);
  }
  // console.log(xs);
  return { xs, ys };
}

class TrainingPage extends React.Component<any, any> {
  public state: any = {
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

  public componentWillMount() {
    this.setState({
      testinputs: generateNumbers(10).xs.map((y:number[]) => y.map((x:number) => x*HIGHEST))
    })
  }

  public componentDidMount() {
    setTimeout(this.trainNetwork, 500);
  }
  
  public trainNetwork = async () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [2,]}));

    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd', metrics: ['accuracy', 'MSE'] });

    const { xs, ys } = generateNumbers();

    const xvalues = tf.tensor2d(xs);
    const yvalues = tf.tensor2d(ys);

    model.fit(
      xvalues,
      yvalues,
      {
        callbacks: {
          onEpochEnd: async (epoch, logs) => {
            // console.dir(logs);
            const values: any = model.predict(tf.tensor(this.state.testinputs.map((y:number[]) => y.map((x:number) => x/HIGHEST))));        
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
              values: values.dataSync().map((value:any) => value*HIGHEST)
            }))
            await tf.nextFrame();
          }
        },
        epochs: this.state.epochs,
        validationSplit: 0.2,
      })
      .then(() => {
        const values: any = model.predict(tf.tensor(this.state.testinputs.map((y:number[]) => y.map((x:number) => x/HIGHEST))));        
        this.setState({
          isTraining: false,
          values: values.dataSync().map((value:any) => value*HIGHEST)
        })
    })
  }
  
  public toggleTestCases = () => {
    this.setState((prevState: any) => ({
      showTestCases: !prevState.showTestCases
    }))
  }

  public getX = (x:any) => x.index

  public render() {
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
