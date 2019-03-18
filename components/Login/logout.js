import React from 'react';
import gql from 'graphql-tag'
import { Spin, Row, Col, Icon } from 'antd';
import {graphql} from "react-apollo/index";
import redirectTo from "../../utils/redirectTo";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const LOGOUT = gql`
  query {
    logout {
      ok
    }
  }
`

function Output({ data }) {
  const rowStyle = {
    height: '100%'
  }
  let content
  if (data.loading) {
    content = <Spin indicator={antIcon} />
  } else {
    if (data.logout.ok) {
      redirectTo('/')
    } else {
      content = <p>Error!</p>
    }
  }
    return (
      <div>
        <Row
          type="flex"
          align="middle"
          justify="center"
          style={rowStyle}
        >
          <Col span={4}>
            {content}
          </Col>
        </Row>
      </div>
    )

}

const DoLogout = graphql(LOGOUT, { options: { notifyOnNetworkStatusChange: true } })(Output);

const Logout = () => (
  <DoLogout />
)

export default Logout