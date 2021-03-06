import React, { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { changeData } from '../../../../utils/fetch';
import MsgAlertBox from '../../../../utils/MsgAlertBox';
import APIURL from '../../../../helpers/environment';

import './CreateCategories.css';

// Props:  sessionToken
interface CreateCategoriesProps {
  sessionToken: string;
  fetchCategories: Function;
}

interface CreateCategoriesState {
  category: string;
  validateIntent: boolean;
  message: string;
}

export default class CreateCategories extends Component<
  CreateCategoriesProps,
  CreateCategoriesState
> {
  constructor(props: CreateCategoriesProps) {
    super(props);
    this.state = {
      category: '',
      validateIntent: false,
      message: '',
    };
  }

  verifyAddIntent = () => {
    if (this.state.category.length < 3) {
      this.setState({
        validateIntent: true,
        message: 'Category must be at least 3 characters',
      });
    } else {
      this.addNewCategory();
    }
  };

  closeMsgBox = () => {
    this.setState({ validateIntent: false });
  };

  addNewCategory = async () => {
    const inputField = document.getElementById(
      'category-field'
    ) as HTMLFormElement;

    const reqBody = { category: this.state.category };
    const url: string = `${APIURL}/categories`;

    await changeData(url, 'POST', reqBody, this.props.sessionToken);

    inputField.value = '';
    this.props.fetchCategories();
  };

  // could not find proper Typescript syntax for keypress code
  KeyPress(e: any) {
    if (e.code === 'Enter') {
      this.verifyAddIntent();
    }
  }

  render() {
    return (
      <div className='col-lg-10'>
        <InputGroup className='mb-5'>
          <FormControl
            aria-label='Example text with button addon'
            aria-describedby='basic-addon1'
            placeholder='Enter new category'
            id='category-field'
            onChange={(e) => this.setState({ category: e.target.value })}
            onKeyPress={this.KeyPress.bind(this)}
          />
          <Button
            variant='success'
            id='button-addon1'
            onClick={this.verifyAddIntent}
          >
            Add
          </Button>
        </InputGroup>

        <MsgAlertBox
          msg={this.state.message}
          validateIntent={this.state.validateIntent}
          closeMsgBox={this.closeMsgBox}
        />
      </div>
    );
  }
}
