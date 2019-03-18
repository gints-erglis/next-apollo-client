
import React, { Component } from 'react'
import Layout from '../layouts/Main';
import withAuthorization from '../utils/requireSignedin'

class Protected extends Component {
  render () {
    if (this.props.isLoggedin()) {
      return <p>You are authorized to see this component</p>
    } else {
      return <p>You are not authorized!</p>
    }
  }
}
const Protected2 = withAuthorization(Protected)

const IndexPage = () => (
  <Layout>
    <p>dashboard</p>
    <Protected2 />
  </Layout>
)


export default IndexPage