import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../../../assets/imgs/profile.png';
import { Badge, Button, Card } from 'react-bootstrap';
import './DisplayUsers.css';
import ConfirmMessage from '../../../utils/ConfirmMessage';
import { IDisplayUsers } from './IDisplayUsers';
import { changeData } from '../../../utils/fetch';

interface DisplayUsersProps {
  allUsers: Array<{
    id: string;
    username: string;
    password: string;
    fname: string;
    lname: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    tele: string;
    email: string;
    role: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  editUser: string;
  updateEditUser: Function;
  sessionToken: string;
  fetchUsers: Function;
}

interface DisplayUsersState {
  redirect: string;
  deleteUser: boolean;
  show: boolean;
  modalMessage: string;
  targetedDeleteUserName: string;
  targetedUser: IDisplayUsers;
  generalMessage: boolean;
}

export default class DisplayUsers extends Component<
  DisplayUsersProps,
  DisplayUsersState
> {
  constructor(props: DisplayUsersProps) {
    super(props);
    this.state = {
      redirect: '',
      deleteUser: false,
      show: false,
      modalMessage: '',
      targetedDeleteUserName: '',
      targetedUser: {
        id: '',
        username: '',
        password: '',
        fname: '',
        lname: '',
        address: '',
        city: 'Granger',
        state: 'Indiana',
        zip: 46530,
        tele: '',
        email: '',
        role: 'subscriber',
        bio: '',
      },
      generalMessage: false,
    };
  }

  handleClose = () => this.setState({ show: false });

  confirmMessage = (data: IDisplayUsers) => {
    this.setState({
      targetedUser: data,
      targetedDeleteUserName: `User: ${data.fname} ${data.lname} `,
      modalMessage: `Are you sure you want to delete this user's account?`,
      show: true,
    });
  };

  confirmDeleteUser = () => this.setState({ show: false, deleteUser: true });

  userDelete = async () => {
    // confirmation to delete user
    if (this.state.deleteUser) {
      // create reqBody
      const reqBody = {};

      // set url
      const url: string = `http://localhost:4000/users/${this.state.targetedUser.id}`;

      // connect with API / HTTP REQUEST DELETE
      await changeData(url, 'DELETE', reqBody, this.props.sessionToken);

      // give confirmation message
      this.setState({
        targetedDeleteUserName: `User: ${this.state.targetedUser.fname} ${this.state.targetedUser.lname}`,
        modalMessage: `This user has been deleted`,
        show: true,
      });

      // re-load users from database
      this.props.fetchUsers();
    } else {
      return;
    }
  };

  // function name mirrors function name shared with DisplaySingleUser.tsx
  // which calls the same Modal.  For this component (DisplayUsers.tsx), the
  // 'redirect' state is not used, but must exist in order for the Modal to
  // be used by both components.

  redirectPage = () =>
    this.setState({
      deleteUser: false,
      show: false,
    });

  componentDidUpdate(
    prevProps: DisplayUsersProps,
    prevState: DisplayUsersState
  ) {
    if (prevState.deleteUser !== this.state.deleteUser) {
      this.userDelete();
    }
  }

  render() {
    return (
      <>
        {this.props.allUsers?.map((data) => {
          const dateLastUpdate = new Date(data.updatedAt).toLocaleString();
          return (
            <Card style={{ width: '18rem' }} key={data.id}>
              <Card.Img variant='top' src={profileImg} />
              <Card.Body>
                <Card.Title>
                  {data.lname}, {data.fname}
                </Card.Title>
                <Card.Text>
                  {data.role === 'admin' && (
                    <Badge pill bg='success'>
                      {data.role}
                    </Badge>
                  )}
                  {data.role === 'member' && (
                    <Badge pill bg='dark'>
                      {data.role}
                    </Badge>
                  )}
                  {data.role === 'subscriber' && (
                    <Badge pill bg='warning' className='text-dark'>
                      {data.role}
                    </Badge>
                  )}
                  <br />
                  {data.address}
                  <br />
                  {data.city}, {data.state} {data.zip}
                  <br />
                  {data.tele}
                  <br />
                  <a href={`mailto:${data.email}`}>{data.email}</a>
                </Card.Text>
                <Button
                  variant='primary'
                  className='me-3'
                  onClick={(e) => this.props.updateEditUser(data.id)}
                >
                  <Link to='/edit-user' className='text-decoration-none'>
                    Edit
                  </Link>
                </Button>
                <Button
                  variant='danger'
                  onClick={(e) => this.confirmMessage(data)}
                >
                  Delete
                </Button>
                <p className='fst-italic mt-3 mb-0' style={{ fontSize: 12 }}>
                  Last update: {dateLastUpdate}
                </p>
              </Card.Body>
            </Card>
          );
        })}

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
      </>
    );
  }
}
