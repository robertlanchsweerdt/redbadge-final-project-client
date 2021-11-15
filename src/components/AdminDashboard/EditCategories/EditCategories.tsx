import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import DisplayCategories from './DisplayCategories/DisplayCategories';
import CreateCategories from './CreateCategories/CreateCategories';

interface EditCategoriesProps {
  sessionToken: string;
}

export default class EditCategories extends Component<EditCategoriesProps> {
  render() {
    return (
      <>
        <h1>Edit Categories</h1>

        <Row>
          <Col md={4}>
            <CreateCategories sessionToken={this.props.sessionToken} />
          </Col>

          <Col md={8}>
            <DisplayCategories sessionToken={this.props.sessionToken} />
          </Col>
        </Row>

        {/* {Object.keys(this.state.data).length > 0 ? (
          <CreateCategories sessionToken={this.props.sessionToken} />
        ) : (
          <p>No Posts to Show</p>
        )} */}
      </>
    );
  }
}
