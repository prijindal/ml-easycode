import * as React from 'react';

// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import NeuralNetworkDiagram from '../src/components/NeuralNetworkDiagram/NeuralNetworkDiagram';


storiesOf('NeuralNetworkDiagram', module)
  .add('NeuralNetworkDiagram', () => (
    <NeuralNetworkDiagram />
  ));
