/* @flow */

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default graphql(gql`
  fragment InputParametersList on Parameters {
    regularizer
    epochs
    initializer
    type
    loss
    shouldNormalize
    layers {
      activationFunction
      type
    }
    optimizer {
      function
    }
  }

  query($templateid: ID!) {
    template: Template(id: $templateid) {
      parameters {
        ...InputParametersList
      }
    }
  }
`);
