import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { InterfaceDisplayCategories } from './InterfaceDisplayCategories';
import './DisplayCategories.css';
import { changeData } from '../../../../utils/fetch';

interface EditCategoriesProps {
  sessionToken: string;
  data: InterfaceDisplayCategories[];
  fetchCategories: Function;
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

  // Office hours help with Marco and Chelsey to identify proper Typescript syntax for this event.  Marco and Chelsey could not determine the syntax for the 'parentElement' to not error.  Settled with 'any.'

  editButton(e: any, category: InterfaceDisplayCategories) {
    this.setState({
      editCategory: true,
      categoryName: category.category,
      categoryId: category.id,
    });

    // get table row of clicked buttons
    const tableRow: HTMLElement = e.target.parentElement.parentElement;

    // hide edit and delete buttons
    tableRow.children[1].classList.add('disableEditDeleteBtn');
    tableRow.children[2].classList.add('disableEditDeleteBtn');

    // show submit and cancel buttons
    tableRow.children[3].classList.remove('cat-submitFunc');
    tableRow.children[4].classList.remove('cat-submitFunc');
  }

  deleteButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    category: InterfaceDisplayCategories
  ) => {
    console.log('delete button -->', category.category);

    this.setState({
      categoryName: category.category,
      categoryId: category.id,
    });

    // create reqBody
    const reqBody = {
      categoryId: this.state.categoryId,
      category: category.category,
    };

    // set url
    const url: string = `http://localhost:4000/categories/${category.id}`;
    console.log('DELETE URL -->', url);

    // connect with API POST
    await changeData(url, 'DELETE', reqBody, this.props.sessionToken);

    // re-render displayed categories
    this.props.fetchCategories();
  };

  // arrow function because need to 'bind' to access this.state
  submitButton = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // create reqBody
    const reqBody = { category: this.state.categoryName };

    // set url
    const url: string = `http://localhost:4000/categories/${this.state.categoryId}`;

    // connect with API POST
    await changeData(url, 'PUT', reqBody, this.props.sessionToken);

    // setState for editCategory to false
    this.setState({ editCategory: false });

    // re-render displayed categories
    this.props.fetchCategories();

    // display default edit and delete buttons
    this.cancelButton(e);
  };

  cancelButton(e: any) {
    // setState for editCategory to false
    this.setState({
      editCategory: false,
    });

    // get table row of clicked buttons
    const tableRow = e.target.parentElement.parentElement;

    // show edit and delete buttons
    tableRow.children[1].classList.remove('disableEditDeleteBtn');
    tableRow.children[2].classList.remove('disableEditDeleteBtn');

    // hide submit and cancel buttons
    tableRow.children[3].classList.add('cat-submitFunc');
    tableRow.children[4].classList.add('cat-submitFunc');
  }

  render() {
    return (
      <div>
        <Table striped bordered hover variant='dark'>
          <tbody>
            {/* working with Hustin and knew to only use 'any' to get Typescript to allow sort() to run  */}

            {this.props.data.length > 0
              ? this.props.data
                  .sort((a: { category: string }, b: { category: string }) => {
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
                          onClick={(e) => this.deleteButton(e, category)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td className='cat-submitFunc'>
                        <Button
                          id='btn-catEdit'
                          onClick={(e) => this.submitButton(e)}
                        >
                          Submit Edit
                        </Button>
                      </td>
                      <td className='cat-submitFunc'>
                        <Button
                          id='btn-catCancel'
                          variant='danger'
                          onClick={(e) => this.cancelButton(e)}
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
