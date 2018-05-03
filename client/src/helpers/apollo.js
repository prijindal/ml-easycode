/* @flow */

import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = 'https://api.graph.cool/simple/v1/cjgh3snvb2esy0163cgo8wsrc';

export const client = new ApolloClient({
  uri,
  link: new HttpLink({ uri }),
  cache: new InMemoryCache(),
});
