import React, { Component } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

interface NavigationProps {}

interface NavigationState {
  isLoggedIn: boolean;
}

export default class Navigation extends Component<
  NavigationProps,
  NavigationState
> {
  constructor(props: boolean) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand='lg' bg='light'>
          <Container>
            <Navbar.Brand as={NavLink} to='/' exact>
              React-Bootstrap
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <Nav.Link eventKey='1' as={NavLink} to='/' exact>
                  Home
                </Nav.Link>
                <Nav.Link eventKey='2' as={NavLink} to='/posts'>
                  Posts
                </Nav.Link>
                <Nav.Link eventKey='3' as={NavLink} to='/calendar'>
                  Calendar
                </Nav.Link>
                <NavDropdown title='Account' id='basic-nav-dropdown'>
                  <NavDropdown.Item
                    eventKey='4'
                    as={NavLink}
                    to='personal-info'
                  >
                    Personal Info
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey='5' as={NavLink} to='/dashboard'>
                    Admin Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey='6'>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
