/* @flow */

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  fragment InputParameterLayer on Layer {
    id
    nodes
    activationFunction
    type
  }

  fragment InputParametersList on Parameters {
    id
    regularizer
    epochs
    initializer
    type
    loss
    shouldNormalize
    hiddenlayers {
      ...InputParameterLayer
    }
    inputlayer {
      ...InputParameterLayer
    }
    outputlayer {
      ...InputParameterLayer
    }
    optimizer {
      function
    }
  }

  fragment InputParametersSampleData on DataSet {
    trainingfile {
      contentType
      name
      size
      url
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
    typeoflayers: __type(name: "LayerType") {
      ...getEnumValues
    }
    template: Template(id: $templateid) {
      sampleData {
        ...InputParametersSampleData
      }
      parameters {
        ...InputParametersList
      }
    }
  }
`);
