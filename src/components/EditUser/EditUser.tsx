import React, { Component } from 'react';
import { fetchData } from '../../utils/fetch';
import DisplaySingleUser from './display/DisplaySingleUser';

interface EditUserProps {
  editUser: string;
  sessionToken: string;
}

interface EditUserState {
  data: Object;
}

export default class EditUser extends Component<EditUserProps, EditUserState> {
  constructor(props: EditUserProps) {
    super(props);
    this.state = { data: {} };
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
    console.log(this.state.data);
    return <DisplaySingleUser data={this.state.data} />;
  }
}
