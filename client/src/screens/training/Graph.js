/* @flow */
import { withStyles } from 'material-ui/styles';
import * as React from 'react';
import Loading from '../../components/Loading';

const decorate = withStyles(theme => ({
  root: {
    marginBottom: 40,
  },
  graph: {
    marginTop: 20,
  },
}));

type GraphProps = {
  chartData: number[][],
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

  componentDidMount() {
    this._mounted = true;
    this.initGraph();
  }

  initGraph = async () => {
    const { axisLabels } = this.props;
    // this.drawGraph();
    const Dygraph = await import('dygraphs');
    if (this._mounted) {
      this.setState({
        isWaiting: false,
      });
    }
    if (this._mounted) {
      this.g = new Dygraph.default(axisLabels.y, [[1, 1]], {
        labels: [axisLabels.x, 'Validation' + axisLabels.y, axisLabels.y],
        width: 340,
        height: 200,
      });
    }
  };

  componentWillUpdate() {
    if (this.g == null) return;
    if (this._mounted) {
      this.g.updateOptions({
        file: this.props.chartData,
      });
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  g: any;
  _mounted: boolean;

  render() {
    if (this.state.isWaiting) {
      return <Loading />;
    }
    const { axisLabels, testing, validation, classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <label>{axisLabels.y}</label>
          <div>Testing: {testing.toString()}</div>
          <div>Validation: {validation.toString()}</div>
        </div>
        <div id={this.props.axisLabels.y} className={classes.graph} />
      </div>
    );
  }
}

export default decorate(Graph);
