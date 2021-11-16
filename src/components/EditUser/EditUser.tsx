import React, { Component } from 'react';
import { fetchData } from '../../utils/fetch';
import DisplaySingleUser from './display/DisplaySingleUser';
import { InterfaceEditUser } from './InterfaceEditUser/InterfaceEditUser';

interface EditUserProps {
  editUser: string;
  sessionToken: string;
}

interface EditUserState {
  data: InterfaceEditUser;
}

export default class EditUser extends Component<EditUserProps, EditUserState> {
  constructor(props: EditUserProps) {
    super(props);
    this.state = {
      data: {
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
        role: '',
        bio: '',
      },
    };
  }

  url: string = `http://localhost:4000/users/${this.props.editUser}`;

  async componentDidMount() {
    this.setState({
      data: await fetchData(this.url, 'GET', this.props.sessionToken),
    });
  }

  render() {
    if (Object.keys(this.state.data).length > 0) {
      console.log('from EditUser.tsx -->', this.state.data);
    }

    return <DisplaySingleUser data={this.state.data} />;
  }
}
