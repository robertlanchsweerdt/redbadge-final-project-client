import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { ILoginResponse } from './InterfaceSignin';
import './SignIn.css';

interface SignInProps {
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

    const reqBody = {
      username: this.state.username,
      password: this.state.password,
    };

    const url: string = 'http://localhost:4000/users/login';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: new Headers({
        'Content-type': 'application/json',
      }),
    })
      .then((res) => {
        if (res.status === 401 || !res.ok) {
          this.setState({ username: '' });
          this.setState({ password: '' });
          (
            document.getElementById('login-error') as HTMLElement
          ).style.display = 'block';
        } else {
          res.json().then((data: ILoginResponse) => {
            const userInfo = {
              token: data.sessionToken,
              user: data.user.id,
              role: data.user.role,
            };

            this.props.updateLocalStorage(userInfo);
          });
        }
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
          <p id='login-error'>Incorrect username or password</p>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                type='text'
                placeholder='username'
                name='username'
                required
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='password'
                name='password'
                required
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Group>

            <Button variant='warning' className='me-2' type='submit'>
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
