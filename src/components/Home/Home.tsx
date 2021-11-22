import React, { Component } from 'react';
import homeImg from '../../assets/imgs/house.jpg';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div id='homePage'>
        <div className='homePage-copy'>
          <h3>Welcome to the</h3>
          <h1 className='mb-0'>Bedrock Hills</h1>
          <h2>Homeowners Association</h2>
          <h2>Web Portal</h2>
        </div>
        <img src={homeImg} alt='house' />
      </div>
    );
  }
}
