
import React, { Component, useState } from 'react'
import Layout from '../layouts/Main';
import withAuthorization, { useAuth } from '../utils/requireSignedin'

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

// Using a hook useAuth()
function Protected3() {
  const [isLoading, isLoggedin] = useAuth();

  if(isLoading)
    return <p>loading...</p>

  if (isLoggedin) {
    return <p>You are authorized to see this component</p>
  } else {
    return <p>You are not authorized!</p>
  }

}

const IndexPage = () => (
  <Layout>
    <p>dashboard</p>
    <Protected2 />
    <Protected3 />
  </Layout>
)


export default IndexPage