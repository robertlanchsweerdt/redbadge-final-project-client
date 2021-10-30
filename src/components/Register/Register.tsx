import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

interface RegisterProps {
  changeLogInState: Function;
  changeNeedRegistration: Function;
}

export default class Register extends Component<RegisterProps> {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Registration</Card.Title>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control type='email' placeholder='username' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control type='password' placeholder='password' />
            </Form.Group>

            <Button
              variant='warning'
              type='submit'
              className='me-2'
              onClick={() => this.props.changeLogInState(true)}
            >
              Register
            </Button>

            <Button
              variant='secondary'
              type='submit'
              onClick={() => this.props.changeNeedRegistration(false)}
            >
              Return to Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
