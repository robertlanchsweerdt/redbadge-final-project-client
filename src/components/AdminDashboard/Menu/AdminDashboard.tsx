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
            <Link to='/registered-users' className='text-decoration-none'>
              <People color='white' size={95} />
              View Users
            </Link>
          </Button>{' '}
          <Button variant='primary'>
            <Link to='/all-posts' className='text-decoration-none'>
              <Stickies color='white' size={95} />
              Reported HOA Violations
            </Link>
          </Button>{' '}
          <Button variant='primary'>
            <Link to='/all-comments' className='text-decoration-none'>
              <Chat color='white' size={90} />
              View User Comments
            </Link>
          </Button>{' '}
          <Button variant='primary'>
            <Link to='/edit-categories' className='text-decoration-none'>
              <Tags color='white' size={95} />
              Edit Categories
            </Link>
          </Button>{' '}
        </div>
      </>
    );
  }
}
