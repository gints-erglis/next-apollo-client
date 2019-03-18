import React from 'react'
import Link from 'next/link'
import { Menu, Icon } from 'antd';
import withAuthorization from '../../utils/requireSignedin.js'
import { withRouter } from 'next/router'

class Nav extends React.Component {

  render() {
    const { router, isLoggedin } = this.props
    const isLoggedIn = isLoggedin()
    let loginItem

    if (!isLoggedIn) {
      loginItem = <Menu.Item key="/login"><Link href='/login'><a><Icon type="login" /><span>Login</span></a></Link></Menu.Item>
    } else {
      loginItem = [
        <Menu.Item key="/profile"><Link href='/profile'><a><Icon type="user" /><span>Accaunt</span></a></Link></Menu.Item>,
        <Menu.Item key="/logout"><Link href='/logout'><a><Icon type="logout" /><span>Logout</span></a></Link></Menu.Item>
      ]
    }
    return (
      <Menu
        theme="dark"
        mode="inline"
        style={{lineHeight: '64px'}}
        defaultSelectedKeys={['/']}
        selectedKeys={[router.pathname]}
      >
        <Menu.Item key="/">
          <Link href='/'><a><Icon type="home" /><span>Home</span></a></Link>
        </Menu.Item>
        <Menu.Item key="/launches">
          <Link href='/launches'><a><Icon type="bars" /><span>Test list</span></a></Link>
        </Menu.Item>
        {loginItem}
      </Menu>
    )
  }
}

export default withRouter(withAuthorization(Nav))