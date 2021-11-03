import React, { Component } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import './Register.css';

interface RegisterProps {
  changeLogInState: Function;
  changeNeedRegistration: Function;
}

export default class Register extends Component<RegisterProps> {
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
            <Form>
              <fieldset>
                <p className='legend'>Residency Info (required)</p>

                <Row>
                  <Form.Group as={Col} md={6} controlId='formGridEmail'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type='text' placeholder='ex. John' required />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridPassword'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='ex. Smith'
                      required
                    />
                  </Form.Group>
                </Row>

                <Form.Group controlId='formGridAddress1'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='ex. 16633 Baywood Ln'
                    required
                  />
                </Form.Group>

                <Row>
                  <Form.Group as={Col} md={6} controlId='formGridAddress1'>
                    <Form.Label>Phone (optional)</Form.Label>
                    <Form.Control type='phone' placeholder='ex. 574-555-5555' />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridAddress1'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='ex. jsmith@email.com'
                      required
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
                <Form.Group controlId='formGridEmail'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type='text' placeholder='ex. jsmith' required />
                </Form.Group>

                <Row className='mb-3'>
                  <Form.Group as={Col} md={6} controlId='formGridPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' required />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' required />
                  </Form.Group>
                </Row>
              </fieldset>

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
      </div>
    );
  }
}
