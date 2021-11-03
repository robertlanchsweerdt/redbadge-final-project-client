import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { ILoginResponse } from './InterfaceSignin';

interface SignInProps {
  changeLogInState: Function;
  changeNeedRegistration: Function;
  updateLocalStorage: Function;
}
interface SignInState {
  username: string;
  password: string;
}

export default class SignIn extends Component<SignInProps, SignInState> {
  constructor(props: SignInProps) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    console.log('handle submit');

    const reqBody = {
      username: this.state.username,
      password: this.state.password,
    };

    const url: string = 'http://localhost:4000/user/login';

    console.log(reqBody);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: new Headers({
        'Content-type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((data: ILoginResponse) => {
        console.log('This is the user id -->', data.user.id);
        this.props.updateLocalStorage(data.sessionToken, data.user.id);
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                type='text'
                placeholder='username'
                name='username'
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='password'
                name='password'
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Group>

            <Button
              variant='warning'
              className='me-2'
              // onClick={() => this.props.changeLogInState(true)}
              type='submit'
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
