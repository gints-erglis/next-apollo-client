
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from "graphql-tag";

const GET_AUTH = gql`
  query {
  logedin {
   ok
  }
}
`

export default (ProtectedRoute) => {
  class AuthHOC extends Component {

    constructor(props, context) {
      super(props, context);
    };

    // Check if there is validated user logged
    isLoggedin = () => {
      return this.props.Authorization.logedin.ok
    };

    // Check if the Authorization query is loading
    isLoading = () => {
      return this.props.Authorization.loading
    };

    render () {
      // Return a Loading component while the isLoading function is 'true'
      if (this.isLoading()) {
        return <p>loading</p>
      }
      // Pass the received 'props' and created functions to the ProtectedRoute component
      return (
        <ProtectedRoute
          {...this.props}
          isLoggedin={this.isLoggedin}
          isLoading={this.isLoading}
        />
      )
    }
  }

  return graphql(GET_AUTH, {
    name: 'Authorization',
    options: {fetchPolicy: 'network-only'}
  })(AuthHOC);
};

export async function hasSignedIn({ apolloClient }) {
  const { data } = await apolloClient.query({ query: GET_AUTH, fetchPolicy: 'no-cache' });
  return data.logedin.ok;
}