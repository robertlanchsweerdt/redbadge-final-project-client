import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { changeData } from '../../../utils/fetch';
import ConfirmMessage from '../../../utils/ConfirmMessage';
import APIURL from '../../../helpers/environment';

// Props:  sessionToken
interface CreateNewsProps {
  sessionToken: string;
  userRole: string;
}

// State: title, narrative
interface CreateNewsState {
  title: string;
  narrative: string;
  redirect: string;
  show: boolean;
  modalMessage: string;
  generalMessage: boolean;
}

export default class CreateNews extends Component<
  CreateNewsProps,
  CreateNewsState
> {
  constructor(props: CreateNewsProps) {
    super(props);
    this.state = {
      title: '',
      narrative: '',
      redirect: '',
      show: false,
      modalMessage: '',
      generalMessage: false,
    };
  }

  // handles modal message box
  handleClose = () => this.setState({ show: false, generalMessage: false });
  handleShow = () => this.setState({ show: true });

  // handles confirm message that news was updated
  confirmUpdateMessage = () => {
    this.setState({
      modalMessage: 'Your news post has been published',
      show: true,
      generalMessage: true,
    });
  };

  // redirects user to a specific page
  redirectPage = () => this.setState({ redirect: '/neighborhood-news' });

  // handles the state changes
  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };

  // submitHandler to POST API
  handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();

    // circuit breaker if nothing entered in the fields and user tries to submit
    if (this.state.title.length < 1 || this.state.narrative.length < 1) return;

    // process POST request if passes circuit breaker
    const reqBody = {
      title: this.state.title,
      narrative: this.state.narrative,
    };

    const url: string = `${APIURL}/news`;

    changeData(url, 'POST', reqBody, this.props.sessionToken);
    this.confirmUpdateMessage();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <h1>Create News Post</h1>
        <Button variant='secondary mb-4'>
          <Link to='/neighborhood-news' className='text-decoration-none'>
            Return to Neighborhood News
          </Link>
        </Button>

        <Form onSubmit={this.handleSubmit}>
          <fieldset>
            <Row>
              <Form.Group as={Col} md={4}>
                <Form.Control
                  type='text'
                  name='title'
                  placeholder='Title of your post'
                  onChange={this.onInputChange}
                />
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Control
                  as='textarea'
                  rows={15}
                  name='narrative'
                  placeholder='Type your narrative here...'
                  onChange={this.onInputChange}
                />
              </Form.Group>
            </Row>
          </fieldset>

          <Button variant='warning' type='submit' className='me-2'>
            Submit
          </Button>

          <Button variant='secondary' type='submit'>
            <Link to='/neighborhood-news' className='text-decoration-none'>
              Discard Post
            </Link>
          </Button>
        </Form>
        <ConfirmMessage
          show={this.state.show}
          handleClose={this.handleClose}
          modalMessage={this.state.modalMessage}
          redirectPage={this.redirectPage}
          generalMessage={this.state.generalMessage}
        />
      </div>
    );
  }
}
