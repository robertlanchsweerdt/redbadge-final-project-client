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

  sortAZ() {
    this.setState({
      users: this.state.users.sort(
        (a: { lname: string }, b: { lname: string }) => {
          if (a.lname > b.lname) {
            return 1;
          }
          if (a.lname < b.lname) {
            return -1;
          }
          return 0;
        }
      ),
    });
  }

  fetchUsers = async () => {
    const url: string = 'http://localhost:4000/users/';

    await this.setState({
      users: await fetchData(url, 'GET', this.props.sessionToken),
    });

    this.sortAZ();
  };

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <>
        <h1>Registered Users</h1>
        <Button variant='secondary' className='mb-5'>
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
