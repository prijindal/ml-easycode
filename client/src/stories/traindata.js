/* @flow */
import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import TrainingDataUpload from '../components/TrainingDataUpload';
import configureStore from '../store/configureStore';

const parameters = {
  id: 'cjgj6bo6doh960101xggmlmuc',
  regularizer: 'L1',
  epochs: 200,
  initializer: 'GLOROT_UNIFORM',
  type: 'REGRESSION',
  loss: 'MEAN_SQUARED_ERROR',
  shouldNormalize: false,
  hiddenlayers: [],
  inputlayer: {
    id: 'cjgq8joc4111c0111yvj651o5',
    nodes: 4,
    activationFunction: 'SIGMOID',
    type: 'INPUT',
    __typename: 'Layer',
  },
  outputlayer: {
    id: 'cjgq8joc4111c0111yvj651o5',
    nodes: 4,
    activationFunction: 'SIGMOID',
    type: 'INPUT',
    __typename: 'Layer',
  },
  optimizer: { function: 'SGD', __typename: 'Optimizer' },
  __typename: 'Parameters',
};

const { store } = configureStore();
store.dispatch({
  type: 'SET_PARAMETERS',
  parameters,
});

storiesOf('TrainingData', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Upload Component', () => <TrainingDataUpload />);
