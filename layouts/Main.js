/* layouts/Main.js */

import Wrapper from './Wrapper'
import Nav from '../components/Nav'
import { Layout, Icon } from 'antd'
import './Main.css'
const { Sider, Header, Content, Footer } = Layout;

class MainLayout extends React.Component {

  state = {
    collapsed: false,
  }

  // If you are using arrow functions then, you do not need to bind any event to this.
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    return (
      <Wrapper className="wrapper">
        {/* hasSider - useful in ssr avoid style flickering */}
      <Layout hasSider >
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Nav/>
        </Sider>
        <Layout className="main-content">
          <Header style={{ background: '#fff', padding: 0 }}>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
      </Wrapper>
    );
  }
}

export default MainLayout
