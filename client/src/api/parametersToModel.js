/* @flow */

import * as tf from '@tensorflow/tfjs';
import { type Parameters } from '../models/parameters';

export const parametersToModel = (parameters: Parameters) => {
  console.log(parameters);
  const model = tf.sequential();
  // First Layer
  const inputLayerNodes =
    parameters.hiddenlayers.length > 0
      ? parameters.hiddenlayers[0].nodes
      : parameters.outputlayer.nodes; // Either 1st hidden layer or output layer
  const inputLayer = tf.layers.dense({
    units: inputLayerNodes,
    inputShape: [parameters.inputlayer.nodes],
  });
  model.add(inputLayer);

  if (parameters.hiddenlayers.length > 0) {
    for (let index = 1; index < parameters.hiddenlayers.length; index++) {
      const hiddenlayer = parameters.hiddenlayers[index];
      model.add(
        tf.layers.dense({
          units: hiddenlayer.nodes,
        })
      );
    }
    model.add(
      tf.layers.dense({
        units: parameters.outputlayer.nodes,
      })
    );
  }

  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'sgd',
    metrics: ['accuracy', 'MSE'],
  });
  return model;
};

export default parametersToModel;
