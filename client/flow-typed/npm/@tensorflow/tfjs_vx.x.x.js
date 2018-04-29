/* @flow */
// flow-typed signature: 680c31ee332f23e75da088a161f0b8a2
// flow-typed version: <<STUB>>/@tensorflow/tfjs_v^0.9.1/flow_v0.70.0

declare module '@tensorflow/tfjs' {
  declare module.exports: TensorFlow;

  declare type TensorFlow = {
    sequential: () => SequentialModel,
    layers: {
      dense: ({
        units: number,
        inputShape: any,
      }) => Layer,
    },
    tensor2d: (a: number[][] | number[]) => Tensor,
    tensor: (a: number[][] | number[]) => Tensor,
  };

  declare type Tensor = any;

  declare type Layer = any;

  declare type SequentialModel = {
    add: Layer => void,
    compile: any => void,
    fit: (x: Tensor, y: Tensor, config: any) => Promise<any>,
    predict: Tensor => Tensor,
  };
}
