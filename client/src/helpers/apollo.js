/* @flow */

import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { persistCache } from 'apollo-cache-persist';

const uri = 'https://api.graph.cool/simple/v1/cjgh3snvb2esy0163cgo8wsrc';

const cache = new InMemoryCache();

// persistCache({
//   cache,
//   storage: window.localStorage,
// });

export const client = new ApolloClient({
  uri,
  link: new HttpLink({ uri }),
  cache,
});
