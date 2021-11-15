import React, { Component } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { InterfaceEditUser } from '../InterfaceEditUser/InterfaceEditUser';

interface DisplaySingleUserProps {
  data: InterfaceEditUser[];
}

interface DisplaySingleUserState {
  username: string;
  password: string;
  fname: string;
  lname: string;
  address: string;
  city: string;
  state_: string;
  zip: number;
  tele: string;
  email: string;
  role: string;
  bio: string;
}

export default class DisplaySingleUser extends Component<
  DisplaySingleUserProps,
  DisplaySingleUserState
> {
  constructor(props: DisplaySingleUserProps) {
    super(props);

    this.state = {
      username: '',
      password: '',
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

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('initial state -->', this.state.lname);
    const key = e.target.name;
    console.log('key -->', key);
    this.setState({ [key]: e.target.value } as any);
  };

  render() {
    console.log('from DisplaySingleUser.tsx -->', this.props.data);

    return (
      <div>
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title className='fs-1'>
              Edit Subscriber Information
            </Card.Title>

            <Form>
              <fieldset>
                <p className='legend'>Residency Info</p>

                <Row>
                  <Form.Group as={Col} md={6} controlId='formGridEmail'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      name='fname'
                      value={this.state.fname || ''}
                      required
                      onChange={this.onInputChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridPassword'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      name='lname'
                      value={this.state.lname || ''}
                      required
                      onChange={this.onInputChange}
                    />
                  </Form.Group>
                </Row>

                <Form.Group controlId='formGridAddress1'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type='text' required />
                </Form.Group>

                <Row>
                  <Form.Group as={Col} md={6} controlId='formGridAddress1'>
                    <Form.Label>Phone (optional)</Form.Label>
                    <Form.Control type='tel' />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridAddress1'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' required />
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
                <p className='legend'>Login Information</p>
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
                  />
                </Form.Group>

                <Row className='mb-3'>
                  <Form.Group as={Col} md={6} controlId='formGridPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className='password'
                      type='password'
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      className='password-confirm'
                      type='password'
                      required
                    />
                  </Form.Group>
                </Row>
              </fieldset>

              <Button variant='warning' type='submit' className='me-2'>
                Register
              </Button>

              <Button variant='secondary' type='submit'>
                Return to Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}