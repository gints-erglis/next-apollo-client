import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Spin, Row, Col, Icon } from 'antd'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import { useRouter } from '../../utils/useRouter'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const LOGOUT = gql`
  query {
    logout {
      ok
    }
  }
`

export const Logout = () => {
  const { data, loading, error } = useQuery(LOGOUT, {
    options: {
      fetchPolicy: 'network-only',
    },
    suspend: false
  });
  const router = useRouter();
  const client = useApolloClient();
  // clear the cache, because fetchPolicy: 'network-only' not work
  client.cache.data.delete('$ROOT_QUERY.logout');

  if (loading) {
    return <p>loading...</p>
  } else if (data.logout.ok) {
    router.push(`/`)
    return <p>Logged out!</p>
  }

}
