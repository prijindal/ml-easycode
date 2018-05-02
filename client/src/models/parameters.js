/* @flow */

export type Parameters = {
  regularizer: string,
  epochs: number,
  initializer: string,
  type: string,
  loss: string,
  shouldNormalize: boolean,
  layers: {
    activationFunction: string,
    type: string,
  },
  optimizer: {
    function: string,
  },
};
