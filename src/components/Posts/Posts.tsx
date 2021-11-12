import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { fetchData } from '../../utils/fetch';

interface PostsProps {
  sessionToken: string;
}

interface PostsState {
  data: Object;
}

export default class Posts extends Component<PostsProps, PostsState> {
  constructor(props: PostsProps) {
    super(props);
    this.state = { data: {} };
  }

  url: string = `http://localhost:4000/posts`;

  async componentDidMount() {
    this.setState({
      data: await fetchData(this.url, 'GET', this.props.sessionToken),
    });
  }

  render() {
    console.log(this.state.data);

    return (
      <>
        <h1>Post Board</h1>
        <Button>
          <Link
            to='/create-post'
            className='d-flex flex-row-reverse justify-content-center align-items-center text-decoration-none'
          >
            <Plus color='white' size={30} className='p-0' />
            Create Post
          </Link>
        </Button>

        {!this.state.data ? <p>Show Posts</p> : <p>No Posts to Show</p>}
      </>
    );
  }
}
