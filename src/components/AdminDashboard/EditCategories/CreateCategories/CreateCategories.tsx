import React, { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { fetchData } from '../../../../utils/fetch';
import './CreateCategories.css';

// Props:  sessionToken
interface CreateCategoriesProps {
  sessionToken: string;
}

interface CreateCategoriesState {
  category: string;
  validateIntent: boolean;
}

const msgBox = document.getElementById('alertMsgBox') as HTMLElement;

export default class CreateCategories extends Component<
  CreateCategoriesProps,
  CreateCategoriesState
> {
  constructor(props: CreateCategoriesProps) {
    super(props);
    this.state = { category: '', validateIntent: false };
  }

  // *****************
  // *****************
  // *****************

  closeAlert = () => {
    console.log('trigger close alert');

    if (msgBox != null) {
      msgBox.style.visibility = 'hidden';
    }

    // this.msgBox.classList.add('alertMsgBoxHide');

    console.log('div -->', msgBox);

    // if (this.msgBox) {
    //   this.msgBox.style.display = 'block';
    // }
  };

  // *****************
  // *****************
  // *****************

  verifyAddIntent = () => {
    console.log('state -->', this.state.category);
    console.log('are you sure?');
    this.state.validateIntent && this.addNewCategory();
  };

  addNewCategory = () => {
    // const url: string = `http://localhost:4000/categories`;

    // fetchData(url, 'POST', this.props.sessionToken);
    console.log('post added to database');
  };

  render() {
    return (
      <>
        <InputGroup className='mb-3'>
          <FormControl
            aria-label='Example text with button addon'
            aria-describedby='basic-addon1'
            placeholder='Enter new category'
            onChange={(e) => this.setState({ category: e.target.value })}
          />
          <Button
            variant='success'
            id='button-addon1'
            onClick={this.verifyAddIntent}
          >
            Add
          </Button>
        </InputGroup>

        <div id='alertMsgBox'>
          <p className='text-black'>Category field must be completed</p>
          <Button variant='danger' onClick={this.closeAlert}>
            Close
          </Button>
        </div>
      </>
    );
  }
}
