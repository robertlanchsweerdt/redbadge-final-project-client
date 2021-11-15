import React, { Component } from 'react';
import { fetchData } from '../../../../utils/fetch';

interface EditCategoriesProps {
  sessionToken: string;
}

interface EditCategoriesState {
  data: Object;
}

export default class DisplayCategories extends Component<
  EditCategoriesProps,
  EditCategoriesState
> {
  constructor(props: EditCategoriesProps) {
    super(props);
    this.state = { data: {} };
  }

  url: string = `http://localhost:4000/categories`;

  async componentDidMount() {
    this.setState({
      data: await fetchData(this.url, 'GET', this.props.sessionToken),
    });
  }

  render() {
    return (
      <div>
        <h2>Display Categories</h2>
      </div>
    );
  }
}
