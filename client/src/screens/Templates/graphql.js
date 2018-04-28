import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(gql`
  {
    templates:allTemplates {
      id
      title
      about
    }
  }
`)
