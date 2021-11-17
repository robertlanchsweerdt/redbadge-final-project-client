import React, { Component } from 'react';
import { InterfaceDisplayCategories } from './InterfaceDisplayCategories';

interface EditCategoriesProps {
  sessionToken: string;
  data: InterfaceDisplayCategories[];
}

interface EditCategoriesState {
  orderedCategories: Array<{}>;
}

export default class DisplayCategories extends Component<
  EditCategoriesProps,
  EditCategoriesState
> {
  constructor(props: EditCategoriesProps) {
    super(props);
    this.state = { orderedCategories: [] };
  }

  render() {
    return (
      <div>
        <h2>Display Categories</h2>

        {/* working with Hustin and knew to only use 'any' to get Typescript to allow sort() to run  */}

        {this.props.data.length > 0
          ? this.props.data
              .sort((a: any, b: any) => {
                if (a.category > b.category) {
                  return 1;
                }
                if (b.category < a.category) {
                  return -1;
                }
                return 0;
              })
              .map((category) => <p key={category.id}>{category.category}</p>)
          : null}
      </div>
    );
  }
}
