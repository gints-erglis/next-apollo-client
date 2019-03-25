import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import { Form, Icon, Spin, Input, Button, Row, Col } from 'antd';
import redirectTo from "../../utils/redirectTo";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

class LoginForm extends Component {

  state = {
    isLoading: false,
    password: '',
    email: '',
  }

  handleChange = (e) => {
    const {name, type, value} = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const rowStyle = {
      height: '100%'
    }
    return (
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={this.state}
        onCompleted={(data) => {
          if (data.login.token)
            localStorage.setItem('auth_token', data.login.token);
          if (data.login.user)
            redirectTo('/')
        }}
      >
        {(login,{error, loading}) => (
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={rowStyle}
      >
        <Col span={4}>
      <Form
        onSubmit={async (e)=>{
          e.preventDefault();
          //Call the mutation
          const res = await login();

          console.log(res);

        }}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your e-mail!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                   id="email"
                   name="email"
                   placeholder="Username"
                   onChange={this.handleChange}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                   id="password"
                   name="password"
                   type="password"
                   placeholder="Password"
                   onChange={this.handleChange}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <p>
          <a className="login-form-forgot" href="">Forgot password</a> Or <a href="/register">register now!</a>
          </p>
        </Form.Item>
      </Form>
          {loading && <Spin indicator={antIcon} />}
          {error && <p>Error :( Please try again</p>}
        </Col>
      </Row>
        )}
      </Mutation>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(LoginForm);

export default Login;