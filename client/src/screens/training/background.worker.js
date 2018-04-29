/* @flow */

import * as tf from '@tensorflow/tfjs';
import * as _ from 'lodash';
const ctx: Worker = self; //eslint-disable-line no-restricted-globals

const obj = { foo: 'foo' };

_.has(obj, 'foo');

// Post data to parent thread
ctx.postMessage({ foo: 'foo' });

// Respond to message from parent thread
ctx.addEventListener('message', (event: any) => {
  const {
    data: { type, ...data },
  } = event;
  if (type === 'train') {
    const { epochs, testinputs } = data;
    startTraining(epochs, testinputs);
  } else if (type === 'generateNumbers') {
    ctx.postMessage({
      numbers: generateNumbers(data.length).xs.map((y: number[]) =>
        y.map((x: number) => x * HIGHEST)
      ),
      type: 'generated',
    });
  }
});

const HIGHEST = 10;

const generateNumbers = (N: number = 1000) => {
  const xs: number[][] = [];
  const ys: number[] = [];
  for (let i = 0; i < N; i += 1) {
    const a = Math.floor(Math.random() * HIGHEST) / HIGHEST;
    const b = Math.floor(Math.random() * HIGHEST) / HIGHEST;
    xs.push([a, b]);
    ys.push(a + b);
  }
  // console.log(xs);
  return { xs, ys };
};

const startTraining = async (epochs: number, testinputs: number[][]) => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [2] }));

  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'sgd',
    metrics: ['accuracy', 'MSE'],
  });

  const { xs, ys } = generateNumbers();

  const xvalues = tf.tensor2d(xs);
  const yvalues = tf.tensor2d(ys);

  console.log('start Training');

  model
    .fit(xvalues, yvalues, {
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          const values: any = model.predict(
            tf.tensor(
              testinputs.map((y: number[]) => y.map((x: number) => x / HIGHEST))
            )
          );
          ctx.postMessage({
            type: 'trainingepochend',
            epoch,
            logs,
            values: values.dataSync().map((value: any) => value * HIGHEST),
          });
        },
      },
      epochs,
      validationSplit: 0.2,
    })
    .then(() => {
      const values: any = model.predict(
        tf.tensor(
          testinputs.map((y: number[]) => y.map((x: number) => x / HIGHEST))
        )
      );
      ctx.postMessage({
        type: 'trainingcompleted',
        values: values.dataSync().map((value: any) => value * HIGHEST),
      });
    });
};
