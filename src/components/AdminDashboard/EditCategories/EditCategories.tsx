import React, { Component } from 'react';
import { fetchData } from '../../../utils/fetch';
import { Col, Row } from 'react-bootstrap';
import DisplayCategories from './DisplayCategories/DisplayCategories';
import CreateCategories from './CreateCategories/CreateCategories';
import { InterfaceDisplayCategories } from '../EditCategories/DisplayCategories/InterfaceDisplayCategories';

interface EditCategoriesProps {
  sessionToken: string;
}

interface EditCategoriesState {
  data: InterfaceDisplayCategories[];
}

export default class EditCategories extends Component<
  EditCategoriesProps,
  EditCategoriesState
> {
  constructor(props: EditCategoriesProps) {
    super(props);

    this.state = { data: [] };
  }

  url: string = `http://localhost:4000/categories`;

  fetchCategories = async () => {
    this.setState({
      data: await fetchData(this.url, 'GET', this.props.sessionToken),
    });
  };

  componentDidMount() {
    this.fetchCategories();
  }

  render() {
    return (
      <>
        <h1>Edit Categories</h1>

        <Row>
          <Col md={6}>
            <CreateCategories
              sessionToken={this.props.sessionToken}
              fetchCategories={this.fetchCategories}
            />
          </Col>

          <Col md={6}>
            <DisplayCategories
              sessionToken={this.props.sessionToken}
              data={this.state.data}
              fetchCategories={this.fetchCategories}
            />
          </Col>
        </Row>
      </>
    );
  }
}
