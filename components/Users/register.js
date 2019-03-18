import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Form, Icon, Input, Button, Row, Col } from 'antd';

const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      user {
        id
      }
    }
  }
`

class RegisterForm extends Component {

  state = {
    isLoading: false,
    name: '',
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
      <Mutation mutation={REGISTER_MUTATION} variables={this.state} >
        {(signup,{error,loading}) => (
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
                  const res = await signup();

                }}>
                <Form.Item>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           id="name"
                           name="name"
                           placeholder="Username"
                           onChange={this.handleChange}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your e-mail!' }],
                  })(
                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           id="email"
                           name="email"
                           placeholder="E-mail"
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
                    Register
                  </Button>
                  <p>
                    Already registered? <a href="/login">Login!</a>
                  </p>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        )}
      </Mutation>
    );
  }
}

const Register = Form.create({ name: 'normal_register' })(RegisterForm);

export default Register;