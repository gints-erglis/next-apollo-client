import React from 'react'
import Link from 'next/link'
import { Menu, Icon } from 'antd';
import { useAuth } from '../../utils/requireSignedin'
import { useRouter } from '../../utils/useRouter'

// Only hooks are used here

function Nav() {

  const [isLoading, isLoggedin, userId] = useAuth();
  const router = useRouter();
  let loginItem

    if (!isLoggedin) {
      loginItem = <Menu.Item key="/login"><Link href='/login'><a><Icon type="login" /><span>Login</span></a></Link></Menu.Item>
    } else {
      loginItem = [
        // Notice the href attribute, it is important set up the id parameter there
        <Menu.Item key="/profile"><Link href={`/profile?id=${userId}`} as={`/user/${userId}`}><a><Icon type="user" /><span>Accaunt</span></a></Link></Menu.Item>,
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
        {loginItem}
      </Menu>
    )

}
export default Nav