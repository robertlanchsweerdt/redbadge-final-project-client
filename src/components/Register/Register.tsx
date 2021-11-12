import React, { Component } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { IRegisterResponse } from './InterfaceRegister';
import './Register.css';

interface RegisterProps {
  changeNeedRegistration: Function;
  updateLocalStorage: Function;
}

interface RegisterState {
  username: string;
  password: string;
  password_confirm: string;
  fname: string;
  lname: string;
  address: string;
  city: string;
  state_: string;
  zip: number;
  tele: null | string;
  email: string;
  role: string;
  bio: string;
}

export default class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirm: '',
      fname: '',
      lname: '',
      address: '',
      city: 'Granger',
      state_: 'Indiana',
      zip: 46530,
      tele: '',
      email: '',
      role: 'subscriber',
      bio: '',
    };
  }

  passwordNotConfirmed() {
    const passwordFailMsg = document.getElementById(
      'password-fail'
    ) as HTMLFormElement;

    passwordFailMsg.style.display = 'block';

    let usernameField = document.getElementsByClassName(
      'username'
    )[0] as HTMLInputElement;

    usernameField.value = '';

    this.setState({ password_confirm: '' });
    this.setState({ password: '' });
  }

  handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();

    if (this.state.password !== this.state.password_confirm) {
      console.log('Your password does not match');
      this.passwordNotConfirmed();
    } else {
      const reqBody = {
        username: this.state.username,
        password: this.state.password,
        fname: this.state.fname,
        lname: this.state.lname,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state_,
        zip: this.state.zip,
        tele: this.state.tele,
        email: this.state.email,
        role: this.state.role,
        bio: this.state.bio,
      };

      const url: string = 'http://localhost:4000/users/register';

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: new Headers({
          'Content-type': 'application/json',
        }),
      })
        .then((res) => {
          if (res.status === 409) {
            // username not unique; give error
            const usernameErrorMsg = document.getElementById(
              'username-fail'
            ) as HTMLElement;

            usernameErrorMsg.style.display = 'block';

            const usernameField = document.querySelector(
              '.username'
            ) as HTMLFormElement;

            usernameField.style.border = 'solid 2px #792020';
          } else {
            // process res because username is unique
            res.json().then((data: IRegisterResponse) => {
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
    }
  };

  render() {
    return (
      <div className='d-flex mx-3'>
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title className='fs-1'>Registration</Card.Title>
            <p className='fw-bold'>
              Registration restricted to residents of Bedrock Hills.
            </p>
            <p className='fst-italic'>
              Your information will be reviewed by the Home Owners Association
              to verify your residency with Bedrock Hills, and used should we
              need to contact you.
            </p>
            <p className='fst-italic'>
              Your information is not shared without your consent unless
              required by law.
            </p>
            <Form onSubmit={this.handleSubmit}>
              <fieldset>
                <p className='legend'>Residency Info (required)</p>

                <Row>
                  <Form.Group as={Col} md={6} controlId='formGridEmail'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='ex. John'
                      required
                      onChange={(e) => this.setState({ fname: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridPassword'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='ex. Smith'
                      required
                      onChange={(e) => this.setState({ lname: e.target.value })}
                    />
                  </Form.Group>
                </Row>

                <Form.Group controlId='formGridAddress1'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='ex. 16633 Baywood Ln'
                    required
                    onChange={(e) => this.setState({ address: e.target.value })}
                  />
                </Form.Group>

                <Row>
                  <Form.Group as={Col} md={6} controlId='formGridAddress1'>
                    <Form.Label>Phone (optional)</Form.Label>
                    <Form.Control
                      type='tel'
                      placeholder='ex. 574-555-5555'
                      onChange={(e) => this.setState({ tele: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridAddress1'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='ex. jsmith@email.com'
                      required
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} md={4} controlId='formGridCity'>
                    <Form.Label>City</Form.Label>
                    <Form.Control defaultValue='Granger' disabled />
                  </Form.Group>

                  <Form.Group as={Col} md={4} controlId='formGridState'>
                    <Form.Label>State</Form.Label>
                    <Form.Control defaultValue='Indiana' disabled />
                  </Form.Group>

                  <Form.Group as={Col} md={4} controlId='formGridZip'>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control defaultValue='46530' disabled />
                  </Form.Group>
                </Row>
              </fieldset>

              <fieldset>
                <p className='legend'>Create Login</p>
                <p id='password-fail'>
                  Password and Confirm Password does not match
                </p>
                <p id='username-fail'>
                  Username already exists. Choose another.
                </p>
                <Form.Group controlId='formGridEmail'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className='username'
                    type='text'
                    placeholder='ex. jsmith'
                    required
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                  />
                </Form.Group>

                <Row className='mb-3'>
                  <Form.Group as={Col} md={6} controlId='formGridPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className='password'
                      type='password'
                      required
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      className='password-confirm'
                      type='password'
                      required
                      onChange={(e) =>
                        this.setState({ password_confirm: e.target.value })
                      }
                    />
                  </Form.Group>
                </Row>
              </fieldset>

              <Button variant='warning' type='submit' className='me-2'>
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
      </div>
    );
  }
}
