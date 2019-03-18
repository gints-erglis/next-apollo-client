
import { List } from 'antd';

export default () => (
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['2']}
    style={{ lineHeight: '64px' }}
  >
    <Menu.Item key="1" >
      <Link href='/'><a>Home</a></Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link href='/launches'><a>Launches</a></Link>
    </Menu.Item>
  </Menu>
)