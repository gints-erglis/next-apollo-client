import React from 'react'
import Layout from '../layouts/Main'
import Launch from '../api/launches'
import withAuthorization from '../utils/requireSignedin.js'

class Default extends React.Component {
  render() {
    if (!this.props.isLoggedin()) {
      console.log('Only logged in users can see this page');
    }
    return (
      <Layout>
        <Launch />
      </Layout>
    );
  }
}

export default withAuthorization(Default)