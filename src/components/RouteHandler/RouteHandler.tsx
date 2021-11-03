import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import Posts from '../Posts/Posts';
import Calendar from '../Calendar/Calendar';
import PersonalInfo from '../Personal_Info/PersonalInfo';
import Auth from '../Auth/Auth';

interface RouteHandlerProps {}

interface RouteHandlerState {
  isLoggedIn: boolean;
  sessionToken: null | string;
  userId: null | string;
}

export default class RouteHandler extends Component<
  RouteHandlerProps,
  RouteHandlerState
> {
  constructor(props: RouteHandlerProps) {
    super(props);
    this.state = { isLoggedIn: false, sessionToken: null, userId: null };
  }

  changeLogInState = (val: boolean) => {
    this.setState({ isLoggedIn: val }, () =>
      console.log('Trigger login state change -->', this.state.isLoggedIn)
    );
  };

  updateLocalStorage = (newToken: string, loggedInUser: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userLoggedIn', loggedInUser);
    this.setState({ sessionToken: newToken });
    this.setState({ userId: loggedInUser });
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ sessionToken: localStorage.getItem('token') });
      this.setState({ userId: localStorage.getItem('userLoggedIn') });
    }
  }

  render() {
    return (
      <Router>
        {console.log('Session Token -->', this.state.sessionToken)}

        {this.state.sessionToken ? (
          <>
            <Navigation />
            <Container>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route exact path='/posts'>
                  <Posts />
                </Route>
                <Route exact path='/calendar'>
                  <Calendar />
                </Route>
                <Route exact path='/personal-info'>
                  <PersonalInfo />
                </Route>
                <Route exact path='/dashboard'>
                  <Dashboard />
                </Route>
              </Switch>
            </Container>
          </>
        ) : (
          <Auth
            updateLocalStorage={this.updateLocalStorage}
            changeLogInState={this.changeLogInState}
          />
        )}
      </Router>
    );
  }
}
