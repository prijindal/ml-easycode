/* @flow */

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  fragment InputParametersList on Parameters {
    id
    regularizer
    epochs
    initializer
    type
    loss
    shouldNormalize
    layers {
      id
      activationFunction
      type
    }
    optimizer {
      function
    }
  }

  fragment getEnumValues on __Type {
    name
    enumValues {
      name
    }
  }

  query($templateid: ID!) {
    typeoflosses: __type(name: "LossFunction") {
      ...getEnumValues
    }
    typeofinitializers: __type(name: "Initializer") {
      ...getEnumValues
    }
    typeoftypes: __type(name: "ParameterType") {
      ...getEnumValues
    }
    typeofoptimizers: __type(name: "OptimizerFunction") {
      ...getEnumValues
    }
    typeofregularizers: __type(name: "Regularizer") {
      ...getEnumValues
    }
    template: Template(id: $templateid) {
      parameters {
        ...InputParametersList
      }
    }
  }
`);
