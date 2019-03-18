import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// To handle a network connection errors check this solution
//https://github.com/molindo/react-apollo-network-status

const defaultOptions = {
  // watchQuery: {
  //   fetchPolicy: 'cache-first',
  //   errorPolicy: 'all'
  // },
  // query: {
  //   fetchPolicy: 'no-cache',
  //   errorPolicy: 'all'
  // },
  // mutate: {
  //   fetchPolicy: 'no-cache',
  //   errorPolicy: 'all'
  // }
};

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL,
  credentials: 'include'
});

// We can combine multiple links
const link = ApolloLink.from([
  httpLink,
]);

export default withApollo(({ ctx, headers, initialState }) => (

  new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    link,
    defaultOptions
  })
))