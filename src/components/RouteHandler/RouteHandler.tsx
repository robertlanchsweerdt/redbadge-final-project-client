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
}

export default class RouteHandler extends Component<
  RouteHandlerProps,
  RouteHandlerState
> {
  constructor(props: RouteHandlerProps) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  changeLogInState = (val: boolean) => {
    this.setState({ isLoggedIn: val }, () =>
      console.log('Trigger login state change -->', this.state.isLoggedIn)
    );
  };

  render() {
    return (
      <Router>
        {this.state.isLoggedIn ? (
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
          <Auth changeLogInState={this.changeLogInState} />
        )}
      </Router>
    );
  }
}
