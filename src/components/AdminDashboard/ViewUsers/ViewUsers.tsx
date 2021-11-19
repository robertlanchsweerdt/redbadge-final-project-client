import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { fetchData } from '../../../utils/fetch';
import DisplayUsers from './DisplayUsers';

interface ViewUsersProps {
  sessionToken: string;
  updateEditUser: Function;
  editUser: string;
}

interface ViewUsersState {
  users: Array<{
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
}

export default class ViewUsers extends Component<
  ViewUsersProps,
  ViewUsersState
> {
  constructor(props: ViewUsersProps) {
    super(props);
    this.state = { users: [] };
  }

  fetchUsers = async () => {
    const url: string = 'http://localhost:4000/users/';

    this.setState({
      users: await fetchData(url, 'GET', this.props.sessionToken),
    });
  };

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <>
        <h1>Registered Users</h1>
        <Button className='mb-5'>
          <Link to='/dashboard' className='text-decoration-none'>
            Return to Dashboard
          </Link>
        </Button>
        <div className='displayUsers-wrapper'>
          <DisplayUsers
            allUsers={this.state.users}
            editUser={this.props.editUser}
            updateEditUser={this.props.updateEditUser}
            sessionToken={this.props.sessionToken}
            fetchUsers={this.fetchUsers}
          />
        </div>
      </>
    );
  }
}
