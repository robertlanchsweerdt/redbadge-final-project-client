import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { InterfaceDisplayCategories } from './InterfaceDisplayCategories';
import './DisplayCategories.css';

interface EditCategoriesProps {
  sessionToken: string;
  data: InterfaceDisplayCategories[];
}

interface EditCategoriesState {
  orderedCategories: Array<{}>;
  categoryName: string;
  editCategory: boolean;
  categoryId: number;
}

export default class DisplayCategories extends Component<
  EditCategoriesProps,
  EditCategoriesState
> {
  constructor(props: EditCategoriesProps) {
    super(props);
    this.state = {
      orderedCategories: [],
      categoryName: '',
      editCategory: false,
      categoryId: 0,
    };
  }

  editButton(e: any, category: InterfaceDisplayCategories) {
    console.log('edit button -->', category);
    const categoryButtonTableRow = e.target.parentElement
      ?.parentElement as HTMLElement;
    console.log(categoryButtonTableRow);
    console.log('event -->', e.target.value);

    this.setState({
      editCategory: true,
      categoryName: category.category,
      categoryId: category.id,
    });
  }

  deleteButton() {
    console.log('delete button');
  }

  submitButton() {
    console.log('submit button');
  }

  cancelButton() {
    console.log('cancel button');
  }

  render() {
    return (
      <div>
        <Table striped bordered hover variant='dark'>
          <tbody>
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
                  .map((category) => (
                    <tr key={category.id}>
                      <td>
                        {this.state.editCategory &&
                        category.id === this.state.categoryId ? (
                          <input
                            type='text'
                            value={this.state.categoryName || ''}
                            onChange={(e) =>
                              this.setState({ categoryName: e.target.value })
                            }
                          />
                        ) : (
                          category.category
                        )}
                      </td>
                      <td>
                        <Button
                          id='btn-catEdit'
                          onClick={(e) => this.editButton(e, category)}
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          id='btn-catDelete'
                          variant='danger'
                          onClick={this.deleteButton}
                        >
                          Delete
                        </Button>
                      </td>
                      <td className='cat-submitFunc'>
                        <Button id='btn-catEdit' onClick={this.submitButton}>
                          Submit Edit
                        </Button>
                      </td>
                      <td className='cat-submitFunc'>
                        <Button
                          id='btn-catCancel'
                          variant='danger'
                          onClick={this.cancelButton}
                        >
                          Cancel Edit
                        </Button>
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </Table>
      </div>
    );
  }
}
