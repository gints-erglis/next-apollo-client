import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// To handle a network connection errors check this solution
//https://github.com/molindo/react-apollo-network-status

const authLink = new ApolloLink((operation, forward) => {
  // Run this only on client side
  if (typeof window !== 'undefined') {

    //localStorage.setItem('auth_token', '1234567890');
    // Retrieve the authorization token from local storage.
    const token = localStorage.getItem('auth_token');
    if(token) {
      operation.setContext({
        headers: {
          authorization: `Basic ${token}`
        }
      });
    }

    console.log(`Basic ${token}`);
  }

  // Call the next link in the middleware chain.
  return forward(operation);
});

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
// const link = ApolloLink.from([
//   authLink,
//   httpLink,
// ]);

export default withApollo(({ ctx, headers, initialState }) => (

  new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    link: authLink.concat(httpLink), // Chain it with the HttpLink,
    defaultOptions
  })
))