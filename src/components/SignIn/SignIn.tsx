import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

interface SignInProps {
  changeLogInState: Function;
  changeNeedRegistration: Function;
}
// interface SignInState {}

export default class SignIn extends Component<SignInProps> {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control type='email' placeholder='username' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control type='password' placeholder='password' />
            </Form.Group>

            <Button
              variant='warning'
              className='me-2'
              onClick={() => this.props.changeLogInState(true)}
            >
              Login
            </Button>
            <Button
              variant='secondary'
              onClick={() => this.props.changeNeedRegistration(true)}
            >
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
