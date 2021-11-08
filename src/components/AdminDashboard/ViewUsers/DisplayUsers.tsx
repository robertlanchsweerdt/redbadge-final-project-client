import React from 'react';
import profileImg from '../../../assets/imgs/profile.png';
import community from '../../../assets/imgs/community.jpg';
import { Image } from 'react-bootstrap';
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
}

export default function DisplayUsers(props: DisplayUsersProps) {
  return (
    <div>
      <h1>Hi</h1>
      {props.allUsers?.map((data) => {
        return (
          <div
            className='card mb-3'
            style={{ maxWidth: '540px' }}
            key={data.id}
          >
            <div className='row no-gutters'>
              <div className='col-md-4 img-container'>
                <img
                  src='https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=620&quality=85&auto=format&fit=max&s=56d5de4c5609ca98def0c3382bd569b4'
                  className='card-img'
                  alt='profile-img'
                />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <h5 className='card-title'>Card title</h5>
                  <p className='card-text'>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className='card-text'>
                    <small className='text-muted'>
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
