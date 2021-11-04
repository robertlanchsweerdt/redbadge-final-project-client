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
  sessionToken: string;
  userId: string;
  userRole: string;
}

interface User {
  token: string;
  user: string;
  role: string;
}

export default class RouteHandler extends Component<
  RouteHandlerProps,
  RouteHandlerState
> {
  constructor(props: RouteHandlerProps) {
    super(props);
    this.state = {
      isLoggedIn: false,
      sessionToken: '',
      userId: '',
      userRole: '',
    };
  }

  updateLocalStorage = (userInfo: User) => {
    localStorage.setItem('user', JSON.stringify(userInfo));
    this.setState({ sessionToken: userInfo.token });
    this.setState({ userId: userInfo.user });
    this.setState({ userRole: userInfo.role });
  };

  clearSession = () => {
    localStorage.clear();
    this.setState({ sessionToken: '' });
    this.setState({ userId: '' });
    this.setState({ userRole: '' });
  };

  componentDidMount() {
    if (localStorage.getItem('user')) {
      const user: User = JSON.parse(localStorage.getItem('user') || '{}');

      this.setState({ sessionToken: user.token });
      this.setState({ userId: user.user });
      this.setState({ userRole: user.role });
    }
  }

  render() {
    return (
      <Router>
        {this.state.sessionToken ? (
          <>
            <Navigation clearSession={this.clearSession} />
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
          <Auth updateLocalStorage={this.updateLocalStorage} />
        )}
      </Router>
    );
  }
}
