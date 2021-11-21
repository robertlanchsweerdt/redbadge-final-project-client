import React, { Component } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { changeData } from '../../../utils/fetch';
import { InterfaceEditUser } from '../InterfaceEditUser/InterfaceEditUser';
import ConfirmMessage from '../../../utils/ConfirmMessage';

interface DisplaySingleUserProps {
  data: InterfaceEditUser;
  sessionToken: string;
}

interface DisplaySingleUserState {
  username: string;
  password?: string;
  confirm_password: string;
  fname: string;
  lname: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  tele: string;
  email: string;
  role: string;
  bio: string | undefined;
  redirect: string;
  deleteUser: boolean;
  show: boolean;
  modalMessage: string;
  targetedDeleteUserName: string;
  updatePassword: boolean;
  generalMessage: boolean;
}

export default class DisplaySingleUser extends Component<
  DisplaySingleUserProps,
  DisplaySingleUserState
> {
  constructor(props: DisplaySingleUserProps) {
    super(props);

    this.state = {
      username: this.props.data.username,
      password: '',
      confirm_password: '',
      fname: this.props.data.fname,
      lname: this.props.data.lname,
      address: this.props.data.address,
      city: 'Granger',
      state: 'Indiana',
      zip: 46530,
      tele: this.props.data.tele,
      email: this.props.data.email,
      role: this.props.data.role,
      bio: this.props.data.bio,
      redirect: '',
      deleteUser: false,
      show: false,
      modalMessage: '',
      targetedDeleteUserName: '',
      updatePassword: false,
      generalMessage: false,
    };
  }

  handleClose = () => this.setState({ show: false, generalMessage: false });
  handleShow = () => this.setState({ show: true });

  confirmUpdateMessage = () => {
    this.setState({
      targetedDeleteUserName: `User: ${this.state.fname} ${this.state.lname}`,
      modalMessage: `This account has been updated`,
      show: true,
      generalMessage: true,
    });
  };

  confirmDeleteMessage = () => {
    this.setState({
      targetedDeleteUserName: `User: ${this.state.fname} ${this.state.lname}`,
      modalMessage: `Are you sure you want to delete this user's account?`,
      show: true,
    });
  };

  confirmDeleteUser = () => this.setState({ show: false, deleteUser: true });

  redirectPage = () =>
    this.setState({ redirect: '/registered-users', deleteUser: false });

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    this.setState({ [key]: e.target.value } as any);
  };

  checkBoxPassword = (e: any) => {
    this.setState({ updatePassword: e.target.checked });
  };

  // function to handle if password and confirm password do not match
  passwordNotConfirmed() {
    const passwordFailMsg = document.getElementById(
      'password-fail'
    ) as HTMLFormElement;

    passwordFailMsg.style.display = 'block';
  }

  // populate user role dropdown
  populateUserRole() {
    const defaultOption: any = document.getElementById('defaultRole');
    defaultOption.textContent = this.props.data.role;
  }

  componentDidUpdate(
    prevProps: DisplaySingleUserProps,
    prevState: DisplaySingleUserState
  ) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        username: this.props.data.username,
        password: '',
        fname: this.props.data.fname,
        lname: this.props.data.lname,
        address: this.props.data.address,
        city: 'Granger',
        state: 'Indiana',
        zip: 46530,
        tele: this.props.data.tele,
        email: this.props.data.email,
        role: this.props.data.role,
        bio: this.props.data.bio,
      });
      this.populateUserRole();
    }

    if (prevState.deleteUser !== this.state.deleteUser) {
      this.userDelete();
    }
  }

  // update user
  userUpdate = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();

    // catch if password does not match
    if (this.state.password !== this.state.confirm_password) {
      this.passwordNotConfirmed();
      return;
    }

    // only runs if password matches
    let reqBody = {
      username: this.state.username,
      password: this.state.password,
      fname: this.state.fname,
      lname: this.state.lname,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      tele: this.state.tele,
      email: this.state.email,
      role: this.state.role,
      bio: this.state.bio,
    };

    console.log('reqBody -->', reqBody);

    // if (this.state.updatePassword) {
    //   const { password, ...rest } = reqBody;
    // }

    console.log('reqBody removed pw -->', reqBody);

    const url: string = `http://localhost:4000/users/${this.props.data.id}`;

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(reqBody),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: this.props.sessionToken,
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
          console.log('Update success');
          this.confirmUpdateMessage();
        }
      })
      .catch((err) => console.error(err));
  };

  // delete user
  userDelete = () => {
    // confirmation to delete user
    if (this.state.deleteUser) {
      // create reqBody
      const reqBody = {};

      // set url
      const url: string = `http://localhost:4000/users/${this.props.data.id}`;

      // connect with API / HTTP REQUEST DELETE
      changeData(url, 'DELETE', reqBody, this.props.sessionToken);

      // give confirmation message
      this.setState({
        targetedDeleteUserName: `User: ${this.state.fname} ${this.state.lname}`,
        modalMessage: `This user has been deleted`,
        show: true,
      });
    } else {
      return;
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title className='fs-1'>
              Edit Subscriber Information
            </Card.Title>
            <Button variant='secondary' className='mb-3'>
              <Link to='/registered-users' className='text-decoration-none'>
                Return to Registered Users
              </Link>
            </Button>

            <Form onSubmit={this.userUpdate}>
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
                  <Form.Control
                    type='text'
                    name='address'
                    value={this.state.address || ''}
                    required
                    onChange={this.onInputChange}
                  />
                </Form.Group>

                <Row>
                  <Form.Group as={Col} md={6} controlId='formGridAddress1'>
                    <Form.Label>Phone (optional)</Form.Label>
                    <Form.Control
                      type='tel'
                      name='tele'
                      value={this.state.tele || ''}
                      onChange={this.onInputChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridAddress1'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      name='email'
                      value={this.state.email || ''}
                      required
                      onChange={this.onInputChange}
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
                <p className='legend'>Subscriber Role</p>
                <Form.Group controlId='formGridRole'>
                  <select
                    name='userRole'
                    id='userRole'
                    onChange={(e) => this.setState({ role: e.target.value })}
                  >
                    <option value='default' id='defaultRole'></option>
                    <option value='admin'>Administrator</option>
                    <option value='member'>HOA Member</option>
                    <option value='subscriber'>Subscriber</option>
                  </select>
                </Form.Group>
              </fieldset>

              <fieldset>
                <p className='legend'>Login Information</p>
                <p id='password-fail'>
                  Password and Confirm Password do not match
                </p>
                <p id='username-fail'>
                  Username already exists. Choose another.
                </p>
                <Form.Group controlId='formGridUsername'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className='username'
                    type='text'
                    name='username'
                    value={this.state.username}
                    required
                    onChange={this.onInputChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='checkPasswordCheckbox'>
                  <Form.Check
                    type='checkbox'
                    label='Update user password'
                    className='mt-3'
                    onChange={(e) => this.checkBoxPassword(e)}
                  />
                </Form.Group>

                {this.state.updatePassword && (
                  <Row className='mb-3'>
                    <Form.Group as={Col} md={6} controlId='formGridPassword'>
                      <Form.Label>New User Password</Form.Label>
                      <Form.Control
                        className='password'
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.onInputChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md={6} controlId='formGridPassword'>
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        className='password-confirm'
                        type='password'
                        name='confirm_password'
                        onChange={this.onInputChange}
                      />
                    </Form.Group>
                  </Row>
                )}
              </fieldset>

              <Button variant='warning' type='submit' className='me-2'>
                Update
              </Button>

              <Button
                variant='danger'
                className='me-2'
                onClick={this.confirmDeleteMessage}
              >
                Delete
              </Button>

              <Button variant='secondary' type='submit'>
                <Link to='/registered-users' className='text-decoration-none'>
                  Cancel Changes
                </Link>
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <ConfirmMessage
          show={this.state.show}
          handleClose={this.handleClose}
          confirmDeleteUser={this.confirmDeleteUser}
          modalMessage={this.state.modalMessage}
          targetedDeleteUserName={this.state.targetedDeleteUserName}
          deleteUser={this.state.deleteUser}
          redirectPage={this.redirectPage}
          generalMessage={this.state.generalMessage}
        />
      </div>
    );
  }
}
