import React, { Component } from 'react';
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

  componentDidMount() {
    const url: string = 'http://localhost:4000/users/';

    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ users: data });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <>
        <h1>Registered Users</h1>
        <div className='displayUsers-wrapper'>
          <DisplayUsers
            allUsers={this.state.users}
            editUser={this.props.editUser}
            updateEditUser={this.props.updateEditUser}
            sessionToken={this.props.sessionToken}
          />
        </div>
      </>
    );
  }
}
