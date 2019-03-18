import React from 'react';
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import { Card, Button, Spin, Icon, List } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const GET_LAUNCH = gql`
  query {
    launch(id:1) {
      site,
      id
     }
  }
`

function Output({ data }) {

  return (
    <Card
      title="Users"
      extra={<Button onClick={() => data.refetch()}>Refresh</Button>}
      style={{ width: 300 }}
      className="mycard"
    >

      { data.loading
        ? <Spin indicator={antIcon} />
        : <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={data.feed.links}
            renderItem={item => (
              <List.Item>
                <p>{item.id}</p>
                <p>{item.url}</p>
              </List.Item>
            )}
          />
      }

    </Card>
  );
}

const FeedWithData = graphql(gql`{
  feed {
    count
    links {
      id
      description
      url
    }
  }
}`, { options: { notifyOnNetworkStatusChange: true } })(Output);

const Launch = () => (
    <FeedWithData />
)

export default Launch