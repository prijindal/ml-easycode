import { withStyles, WithStyles } from 'material-ui/styles';
import * as React from 'react';

const decorate = withStyles((theme) => ({
  root: {
    flex: 1,
  },
}));

export interface NeuralNetworkDiagramProps {};

class NeuralNetworkDiagram extends React.PureComponent<NeuralNetworkDiagramProps & WithStyles<'root'>, null> {

  public render() {
    const { classes } = this.props;    
    return (
      <div className={classes.root}>
        NeuralNetworkDiagram
      </div>
    );
  }
}

export default decorate<NeuralNetworkDiagramProps>(NeuralNetworkDiagram);
