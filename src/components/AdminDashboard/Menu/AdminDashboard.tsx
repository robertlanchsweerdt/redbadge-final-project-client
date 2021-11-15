import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Chat, People, Stickies, Tags } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

export default class AdminDashboard extends Component {
  render() {
    return (
      <>
        <h1>Admin Dashboard</h1>
        <div className='button-wrapper'>
          <Button variant='primary'>
            <Link to='/registered-users'>
              <People color='white' size={95} />
              View Users
            </Link>
          </Button>{' '}
          <Button variant='primary'>
            <Link to='/all-posts'>
              <Stickies color='white' size={95} />
              HOA Complaints
            </Link>
          </Button>{' '}
          <Button variant='primary'>
            <Link to='/all-comments'>
              <Chat color='white' size={90} />
              View User Comments
            </Link>
          </Button>{' '}
          <Button variant='primary'>
            <Link to='/edit-categories'>
              <Tags color='white' size={95} />
              Edit Categories
            </Link>
          </Button>{' '}
        </div>
      </>
    );
  }
}
