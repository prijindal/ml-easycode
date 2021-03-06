/* @flow */

import * as d3 from 'd3';
import * as React from 'react';
import injectSheet, { type JSSProps } from 'react-jss';

type Node = {
  name: string,
  x: number,
  y: number,
  r: number,
};

type Edge = {
  nodes: Node[],
};

const styles = {
  root: {
    flex: 1,
    minWidth: 320,
  },
  svg: {
    width: '100%',
  },
};

export type NeuralNetworkDiagramProps = {
  layers?: number[],
};

export type NeuralNetworkDiagramState = {
  minHeight: number,
};

class NeuralNetworkDiagram extends React.Component<
  NeuralNetworkDiagramProps & JSSProps<typeof styles>,
  NeuralNetworkDiagramState
> {
  static defaultProps = {
    layers: [3, 4, 2],
  };

  state: NeuralNetworkDiagramState = {
    minHeight: 500,
  };

  componentDidMount() {
    const { layers } = this.props;
    if (layers == null) {
      return;
    }
    const graph: { nodes: Node[], edges: Edge[] } = {
      nodes: [],
      edges: [],
    };
    const BREAKPOINT = 960;
    let RADIUS = window.innerWidth > BREAKPOINT ? 40 : 20;
    let X_PADDING = window.innerWidth > BREAKPOINT ? 150 : 75;
    let Y_PADDING = window.innerWidth > BREAKPOINT ? 100 : 50;
    const biggestLayer = Math.max(...layers);
    const BREAK_NODES = [5, 10, 15, 20];
    for (const N_NODES of BREAK_NODES) {
      if (biggestLayer > N_NODES) {
        RADIUS /= 2;
        X_PADDING /= 2;
        Y_PADDING /= 2;
      }
    }
    const biggestHeight = biggestLayer * Y_PADDING + 50;
    this.setState({
      minHeight: biggestHeight,
    });
    for (let k = 0; k < layers.length; k += 1) {
      const X_INIT = 50;
      const Y_INIT = 50 + (biggestHeight - (layers[k] * Y_PADDING + 50)) / 2;
      for (let i = 0; i < layers[k]; i += 1) {
        const node = {
          name: `${k + 1}.${i}`,
          x: k * X_PADDING + X_INIT,
          y: i * Y_PADDING + Y_INIT,
          r: RADIUS,
        };
        graph.nodes.push(node);
        if (k > 0) {
          for (let j = 0; j < layers[k - 1]; j += 1) {
            graph.edges.push({
              nodes: [
                node,
                graph.nodes.filter((n: Node) => n.name === `${k}.${j}`)[0],
              ],
            });
          }
        }
      }
    }
    this.drawDiagram(graph);
  }

  drawDiagram = async graph => {
    const width = 2000;
    const height = 2000;

    const svg = d3
      .select('#canvas')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');

    svg
      .attr('class', 'line')
      .selectAll('line')
      .data(graph.edges)
      .enter()
      .append('line')
      .style('stroke', 'gray')
      .attr('x1', (d: Edge) => d.nodes[0].x)
      .attr('y1', (d: Edge) => d.nodes[0].y)
      .attr('x2', (d: Edge) => d.nodes[1].x)
      .attr('y2', (d: Edge) => d.nodes[1].y);

    svg
      .selectAll('circle')
      .data(graph.nodes)
      .enter()
      .append('circle')
      .style('stroke', 'gray')
      .style('fill', 'white')
      .attr('r', (d: Node) => d.r)
      .attr('cx', (d: Node) => d.x)
      .attr('cy', (d: Node) => d.y);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <svg
          id="canvas"
          className={classes.svg}
          style={{
            minHeight: this.state.minHeight,
          }}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(NeuralNetworkDiagram);
