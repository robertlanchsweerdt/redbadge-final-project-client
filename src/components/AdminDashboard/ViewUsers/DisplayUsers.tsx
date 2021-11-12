import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../../../assets/imgs/profile.png';
import { Badge, Button, Card } from 'react-bootstrap';
import './DisplayUsers.css';

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
}

interface DisplayUsersState {
  rows: number;
  current_page: number;
  paginatedData: [];
}

export default class DisplayUsers extends Component<
  DisplayUsersProps,
  DisplayUsersState
> {
  constructor(props: DisplayUsersProps) {
    super(props);
    this.state = { rows: 4, current_page: 0, paginatedData: [] };
  }

  pagination() {
    console.log('loading pagination');
    this.setState({ current_page: this.state.current_page - 1 });
    console.log(this.state.current_page, this.state.rows);
    console.log('Data -->', this.props.allUsers);
    const pageStart = this.state.current_page * this.state.rows;
    const pageEnd = pageStart + this.state.rows;
    const trimmedData = this.props.allUsers.slice(pageStart, pageEnd);

    console.log(trimmedData);
    return trimmedData;
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
                  {data.role === 'admin' ? (
                    <Badge pill bg='success'>
                      {data.role}
                    </Badge>
                  ) : (
                    <Badge pill bg='secondary'>
                      {data.role}
                    </Badge>
                  )}
                  <br />
                  {data.address}
                  <br />
                  {data.city}, {data.state} {data.zip}
                  {data.tele}
                  <br />
                  <a href={`mailto:${data.email}`}>{data.email}</a>
                </Card.Text>
                <Button
                  variant='primary'
                  className='me-3'
                  onClick={(e) => this.props.updateEditUser(data.id)}
                >
                  <Link to='/edit-user'>Edit</Link>
                </Button>
                <Button variant='danger'>Delete</Button>
                <p className='fst-italic mt-3 mb-0' style={{ fontSize: 12 }}>
                  Last update: {dateLastUpdate}
                </p>
              </Card.Body>
            </Card>
          );
        })}
      </>
    );
  }
}
