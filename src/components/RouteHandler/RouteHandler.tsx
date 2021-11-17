import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Auth from '../Auth/Auth';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import AdminDashboard from '../AdminDashboard/Menu/AdminDashboard';
import Posts from '../Posts/Posts';
import ProfileInfo from '../User/UserProfile/UserProfile';
import UserPosts from '../User/UserPosts/UserComments';
import UserComments from '../User/UserComments/UserComments';
import ViewUsers from '../AdminDashboard/ViewUsers/ViewUsers';
import ViewPosts from '../AdminDashboard/ViewComplaints/ViewComplaints';
import ViewComments from '../AdminDashboard/ViewComments/ViewComments';
import EditCategories from '../AdminDashboard/EditCategories/EditCategories';
import EditUser from '../EditUser/EditUser';
import CreatePosts from '../Posts/CreatePosts/CreatePosts';
import Complaints from '../Complaints/Complaints';

interface RouteHandlerProps {}

interface RouteHandlerState {
  isLoggedIn: boolean;
  sessionToken: string;
  userId: string;
  userRole: string;
  editUser: string;
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
      editUser: '',
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
      this.setState({ editUser: '' });
    }
  }

  updateEditUser = (selectedId: string) => {
    this.setState({ editUser: selectedId });
  };

  render() {
    return (
      <Router>
        {this.state.sessionToken ? (
          <>
            <Navigation
              clearSession={this.clearSession}
              userRole={this.state.userRole}
            />
            <main>
              <Container>
                <Switch>
                  <Route exact path='/'>
                    <Home />
                  </Route>
                  <Route exact path='/complaints'>
                    <Complaints sessionToken={this.state.sessionToken} />
                  </Route>
                  <Route exact path='/posts'>
                    <Posts sessionToken={this.state.sessionToken} />
                  </Route>
                  <Route exact path='/create-post'>
                    <CreatePosts sessionToken={this.state.sessionToken} />
                  </Route>
                  <Route exact path='/profile'>
                    <ProfileInfo />
                  </Route>
                  <Route exact path='/user-posts'>
                    <UserPosts />
                  </Route>
                  <Route exact path='/user-comments'>
                    <UserComments />
                  </Route>
                  <Route exact path='/edit-user'>
                    <EditUser
                      editUser={this.state.editUser}
                      sessionToken={this.state.sessionToken}
                    />
                  </Route>
                  {this.state.userRole === 'admin' && (
                    <>
                      <Route exact path='/dashboard' key='/restricted/1'>
                        <AdminDashboard />
                      </Route>
                      <Route exact path='/registered-users' key='/restricted/2'>
                        <ViewUsers
                          sessionToken={this.state.sessionToken}
                          editUser={this.state.editUser}
                          updateEditUser={this.updateEditUser}
                        />
                      </Route>
                      <Route exact path='/all-posts' key='/restricted/3'>
                        <ViewPosts />
                      </Route>
                      <Route exact path='/all-comments' key='/restricted/4'>
                        <ViewComments />
                      </Route>
                      <Route exact path='/edit-categories' key='/restricted/5'>
                        <EditCategories
                          sessionToken={this.state.sessionToken}
                        />
                      </Route>
                    </>
                  )}
                </Switch>
              </Container>
            </main>
          </>
        ) : (
          <Auth updateLocalStorage={this.updateLocalStorage} />
        )}
      </Router>
    );
  }
}
