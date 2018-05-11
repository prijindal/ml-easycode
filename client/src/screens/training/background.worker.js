/* @flow */

import * as tf from '@tensorflow/tfjs';
import math from 'mathjs';
import { type Parameters } from '../../models/parameters';
import parametersToModel from '../../api/parametersToModel';
import axios from 'axios';
import * as Papa from 'papaparse';

const ctx: Worker = (self: Worker); //eslint-disable-line no-restricted-globals

// Post data to parent thread
ctx.postMessage({ foo: 'foo' });

interface FileType {
  url: string;
  __typename: string;
}

type EventResponseData = {
  type: 'train',
  parameters: Parameters,
  trainfile: File | FileType,
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
    const { parameters, trainfile } = data;
    if (
      trainfile.__typename != null &&
      trainfile.__typename === 'File' &&
      trainfile.url != null &&
      !(trainfile instanceof File) &&
      typeof trainfile.url === 'string'
    ) {
      const url: string = trainfile.url;
      axios(url).then(({ data }) => {
        data = data.split('\n');
        data = data.map(row => row.split(','));
        parseDataAndStartTraining(data, parameters);
      });
    } else {
      Papa.parse(trainfile, {
        worker: false,
        complete: ({ data, errors }) => {
          parseDataAndStartTraining(data, parameters);
        },
        error: console.log,
      });
    }
  }
});

const parseDataAndStartTraining = (data, parameters: Parameters) => {
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
  startTraining(parameters, trainX, trainY, testX, testY);
};

const normalize = (arr: any[]): any[] => {
  const newArr = [];
  for (let i = 0; i < arr[0].length; i += 1) {
    let subarr = arr.map(row => parseInt(row[i], 10));
    let subArrPos = subarr.map(row => Math.abs(row));
    const maximum = Math.max(...subArrPos);
    subarr = subarr.map(row => row / maximum);
    newArr.push(subarr);
  }
  return math.transpose(newArr);
};

const startTraining = async (
  parameters: Parameters,
  trainX,
  trainY,
  testX,
  testY
) => {
  const model = parametersToModel(parameters);

  // if (parameters.shouldNormalize) {
  //   trainX = normalize(trainX);
  //   trainY = normalize(trainY);
  //   testX = normalize(testX);
  //   testY = normalize(testY);
  // }

  // const { xs, ys } = generateNumbers();

  // console.log(trainX);
  // console.log(trainY);

  try {
    let xvalues = tf.tensor(
      trainX,
      [trainX.length, parameters.inputlayer.nodes],
      'float32'
    );
    // console.log(xvalues);
    const yvalues = tf.tensor(trainY, [
      trainY.length,
      parameters.outputlayer.nodes,
    ]);
    // console.log(yvalues);

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
        epochs: parameters.epochs,
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
