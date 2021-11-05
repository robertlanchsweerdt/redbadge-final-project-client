import React, { Component } from 'react';

interface ViewUsersProps {}

interface ViewUsersState {}

export default class ViewUsers extends Component<
  ViewUsersProps,
  ViewUsersState
> {
  render() {
    return (
      <div>
        <h1>Registered Users</h1>
      </div>
    );
  }
}
