/* @flow */
import { withStyles } from 'material-ui/styles';
import * as React from 'react';
import Loading from '../../components/Loading';

const decorate = withStyles(theme => ({
  root: {
    marginBottom: 40,
  },
}));

type GraphProps = {
  chartData: number[][],
  legends: string[],
  axisLabels: {
    x: string,
    y: string,
  },
  testing: number,
  validation: number,
  classes: decorate.classes,
};

class Graph extends React.Component<GraphProps, any> {
  state = {
    isWaiting: true,
  };
  componentWillMount() {
    this.drawGraph();
  }

  Legend: any;
  LineChart: any;

  drawGraph = async () => {
    const { Legend, LineChart } = await import('react-easy-chart');
    this.Legend = Legend;
    this.LineChart = LineChart;
    this.setState({
      isWaiting: false,
    });
  };
  render() {
    if (this.state.isWaiting) {
      return <Loading />;
    }
    const {
      chartData,
      legends,
      axisLabels,
      testing,
      validation,
      classes,
    } = this.props;
    const { Legend, LineChart } = this;
    return (
      <div className={classes.root}>
        <div>
          <label>{axisLabels.y}</label>
          <div>Testing: {testing.toString()}</div>
          <div>Validation: {validation.toString()}</div>
          {/* <div>{logs.loss.toString()}</div>
        <div>{logs.val_loss.toString()}</div> */}
        </div>
        <LineChart
          // yDomainRange={[0, maxY]}
          height={200}
          width={340}
          axes={true}
          lineColors={['#e3a51a', '#3f4c55']}
          axisLabels={axisLabels}
          data={chartData}
        />
        <Legend
          data={[
            { key: legends[0], color: '#3f4c55' },
            { key: legends[1], color: '#e3a51a' },
          ]}
          dataId={'key'}
          config={[{ color: '#3f4c55' }, { color: '#e3a51a' }]}
        />
      </div>
    );
  }
}

export default decorate(Graph);
