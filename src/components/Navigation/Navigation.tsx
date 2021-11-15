import React, { Component } from 'react';
import { Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

interface NavigationProps {
  clearSession: Function;
  userRole: string;
}

export default class Navigation extends Component<NavigationProps> {
  render() {
    return (
      <header>
        <Navbar collapseOnSelect expand='lg' bg='light'>
          <Container>
            <Navbar.Brand as={NavLink} to='/' exact>
              Bedrock Hills HOA
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <Nav.Link eventKey='1' as={NavLink} to='/complaints'>
                  HOA Complaints
                </Nav.Link>
                <Nav.Link eventKey='2' as={NavLink} to='/posts'>
                  Neighborhood News
                </Nav.Link>
                <NavDropdown title='Account' id='basic-nav-dropdown'>
                  <NavDropdown.Item eventKey='3' as={NavLink} to='profile'>
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item eventKey='4' as={NavLink} to='user-posts'>
                    View Your Posts
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    eventKey='5'
                    as={NavLink}
                    to='user-comments'
                  >
                    View Your Comments
                  </NavDropdown.Item>

                  {this.props.userRole === 'admin' && (
                    <NavDropdown.Item eventKey='6' as={NavLink} to='/dashboard'>
                      Admin Dashboard
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Divider />
                  <Button
                    className='d-block mx-auto'
                    onClick={() => this.props.clearSession()}
                  >
                    <Link to='/'>Logout</Link>
                  </Button>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
