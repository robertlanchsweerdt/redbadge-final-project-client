import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

// Props:  sessionToken
interface CreatePostsProps {
  sessionToken: string;
}

// State: title, category, status, has_address, address, city, state, zip, narrative, cal_date, photos
interface CreatePostsState {
  title: string;
  category: string;
  status: string;
  has_address: boolean;
  address: string;
  city: string;
  state_: string;
  zip: number;
  narrative: string;
  cal_date: string;
}

// Form to intake data

// Submit button to submitHandler

// submitHandler to POST API

export default class CreatePosts extends Component<
  CreatePostsProps,
  CreatePostsState
> {
  constructor(props: CreatePostsProps) {
    super(props);
    this.state = {
      title: '',
      category: '',
      status: '',
      has_address: false,
      address: '',
      city: 'Granger',
      state_: 'Indiana',
      zip: 46530,
      narrative: '',
      cal_date: '',
    };
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('change detected');
    console.log(e.target.name);
    console.log('Date-->', this.state.cal_date);
    this.setState({ [e.target.name]: e.target.value } as any);
  };

  handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    console.log('your post submitted');

    const reqBody = {
      title: this.state.title,
      category: this.state.category,
      status: this.state.status,
      has_address: this.state.has_address,
      address: this.state.address,
      city: 'Granger',
      state_: 'Indiana',
      zip: 46530,
      narrative: this.state.narrative,
      cal_date: this.state.cal_date,
    };

    const url: string = 'http://localhost:4000/posts';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div>
        <h1>Create Post</h1>
        <Form onSubmit={this.handleSubmit}>
          <fieldset>
            <p className='legend'>Residency Info (required)</p>

            <Row>
              <Form.Group as={Col} md={6} controlId='formGridEmail'>
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  onChange={this.onInputChange}
                />
              </Form.Group>

              <Form.Group as={Col} md={6} controlId='formGridPassword'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  name='category'
                  onChange={this.onInputChange}
                />
              </Form.Group>
            </Row>

            <Form.Group controlId='formGridAddress1'>
              <Form.Label>Does your post involve an address?</Form.Label>
              <Form.Control
                type='checkbox'
                name='has_address'
                onChange={this.onInputChange}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} md={6} controlId='formGridAddress1'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  name='address'
                  placeholder='123 N Main St'
                  onChange={this.onInputChange}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md={4} controlId='formGridCity'>
                <Form.Label>City</Form.Label>
                <Form.Control defaultValue='Granger' disabled />
              </Form.Group>

              <Form.Group as={Col} md={4} controlId='formGridState'>
                <Form.Label>State</Form.Label>
                <Form.Control defaultValue='Indiana' disabled />
              </Form.Group>

              <Form.Group as={Col} md={4} controlId='formGridZip'>
                <Form.Label>Zip</Form.Label>
                <Form.Control defaultValue='46530' disabled />
              </Form.Group>
            </Row>

            <Form.Group controlId='formGridZip'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='date'
                name='cal_date'
                onChange={this.onInputChange}
              />
            </Form.Group>

            <Form.Group controlId='formGridZip'>
              <Form.Label>Narrative</Form.Label>
              <Form.Control
                type='textarea'
                name='narrative'
                onChange={this.onInputChange}
              />
            </Form.Group>
          </fieldset>

          <Button variant='warning' type='submit' className='me-2'>
            Submit
          </Button>

          <Button variant='secondary' type='submit'>
            Discard Post
          </Button>
        </Form>
      </div>
    );
  }
}
