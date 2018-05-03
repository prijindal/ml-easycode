/* @flow */

export type EnumType = {
  name: string,
  enumValues: {
    name: string,
  }[],
};

export type Layer = {
  activationFunction: string,
  nodes: number,
  type: string,
};

export type Parameters = {
  regularizer: string,
  epochs: number,
  initializer: string,
  type: string,
  loss: string,
  shouldNormalize: boolean,
  hiddenlayers: Layer[],
  inputlayer: Layer,
  outputlayer: Layer,
  optimizer: {
    function: string,
  },
};
