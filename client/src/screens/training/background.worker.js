/* @flow */

import * as tf from '@tensorflow/tfjs';
import { type Parameters } from '../../models/parameters';
import parametersToModel from '../../api/parametersToModel';
import * as Papa from 'papaparse';

const ctx: Worker = (self: Worker); //eslint-disable-line no-restricted-globals

// Post data to parent thread
ctx.postMessage({ foo: 'foo' });

type EventResponseData = {
  type: 'train',
  epochs: number,
  parameters: Parameters,
  testinputs: number[][],
  trainfile: File,
  length: number,
};

function filterWithIndex(arr1, arr2, shouldInclude) {
  if (shouldInclude) {
    return arr1.filter((row, index) => arr2.indexOf(index) >= 0);
  } else {
    return arr1.filter((row, index) => arr2.indexOf(index) < 0);
  }
}

function train_test_split(xs, ys, split_factor = 0.01) {
  const random_values = [];
  const N = xs.length;
  const test_n_values = Math.floor(N * split_factor);
  for (let i = 0; i < test_n_values; i += 1) {
    const rand_int = Math.floor(Math.random() * N);
    random_values.push(rand_int);
  }
  const trainX = filterWithIndex(xs, random_values, false);
  const testX = filterWithIndex(xs, random_values, true);
  const trainY = filterWithIndex(ys, random_values, false);
  const testY = filterWithIndex(ys, random_values, true);
  return {
    trainX,
    trainY,
    testX,
    testY,
  };
}
// Respond to message from parent thread
ctx.addEventListener('message', (event: any) => {
  const data: EventResponseData = event.data;
  const type = data.type;
  if (type === 'train') {
    const { parameters, epochs, trainfile } = data;
    Papa.parse(trainfile, {
      worker: false,
      complete: ({ data, errors }) => {
        if (data[data.length - 1][0] === '') {
          data.splice(data.length - 1);
        }
        const Xs = data.map(row => row.slice(0, parameters.inputlayer.nodes));
        const Ys = data.map(row =>
          row.slice(
            parameters.inputlayer.nodes,
            parameters.inputlayer.nodes + parameters.outputlayer.nodes
          )
        );
        const { trainX, trainY, testX, testY } = train_test_split(Xs, Ys);
        // Split data into trainX, trainY, testX, testY
        ctx.postMessage({
          testX,
          testY,
          type: 'readdatasuccess',
        });
        startTraining(parameters, epochs, trainX, trainY, testX, testY);
      },
      error: console.log,
    });
  }
});

const startTraining = async (
  parameters: Parameters,
  epochs: number,
  trainX,
  trainY,
  testX,
  testY
) => {
  const model = parametersToModel(parameters);

  // const { xs, ys } = generateNumbers();

  console.log(trainX);
  console.log(trainY);

  try {
    const xvalues = tf.tensor(
      trainX,
      [trainX.length, parameters.inputlayer.nodes],
      'float32'
    );
    console.log(xvalues);
    const yvalues = tf.tensor(trainY, [
      trainY.length,
      parameters.outputlayer.nodes,
    ]);
    console.log(yvalues);

    await model
      .fit(xvalues, yvalues, {
        callbacks: {
          onEpochEnd: async (epoch, logs) => {
            const values: any = model.predict(tf.tensor(testX));
            ctx.postMessage({
              type: 'trainingepochend',
              epoch,
              logs,
              values: values.dataSync(),
            });
          },
        },
        epochs,
        validationSplit: 0.2,
      })
      .then(() => {
        const values: any = model.predict(tf.tensor(testX));
        ctx.postMessage({
          type: 'trainingcompleted',
          values: values.dataSync(),
        });
      });
  } catch (e) {
    console.error(e);
  }
};
