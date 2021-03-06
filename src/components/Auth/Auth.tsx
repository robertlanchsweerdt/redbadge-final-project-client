import React, { Component } from 'react';
import communityImg from '../../assets/imgs/community.jpg';
import Register from '../Register/Register';
import SignIn from '../SignIn/SignIn';
import './Auth.css';

interface AuthProps {
  updateLocalStorage: Function;
}

interface AuthState {
  needRegistration: boolean;
}

export default class Auth extends Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = { needRegistration: false };
  }

  changeNeedRegistration = (val: boolean) => {
    this.setState({ needRegistration: val }, () =>
      console.log(
        'Trigger change registration -->',
        this.state.needRegistration
      )
    );
  };

  render() {
    return (
      <div id='wrapper'>
        <h1 className='text-center px-2'>Bedrock Hills</h1>
        <h3 className='text-center mb-5 px-2'>Homeowners Association Portal</h3>

        {this.state.needRegistration ? (
          <Register
            changeNeedRegistration={this.changeNeedRegistration}
            updateLocalStorage={this.props.updateLocalStorage}
          />
        ) : (
          <SignIn
            changeNeedRegistration={this.changeNeedRegistration}
            updateLocalStorage={this.props.updateLocalStorage}
          />
        )}
        <img src={communityImg} alt='overhead view of a neighborhood' />
      </div>
    );
  }
}
