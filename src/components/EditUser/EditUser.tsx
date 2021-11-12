import React, { Component } from 'react';
import { fetchData } from '../../utils/fetch';
import DisplaySingleUser from './display/DisplaySingleUser';
import { InterfaceEditUser } from './InterfaceEditUser/InterfaceEditUser';

interface EditUserProps {
  editUser: string;
  sessionToken: string;
}

interface EditUserState {
  data: InterfaceEditUser[];
}

export default class EditUser extends Component<EditUserProps, EditUserState> {
  constructor(props: EditUserProps) {
    super(props);
    this.state = { data: [] };
  }

  url: string = `http://localhost:4000/users/${this.props.editUser}`;

  async componentDidMount() {
    this.setState({
      data: await fetchData(this.url, 'GET', this.props.sessionToken),
    });
  }

  render() {
    if (!this.state.data) {
      return <p>No data</p>;
    }
    return <DisplaySingleUser data={this.state.data} />;
  }
}
