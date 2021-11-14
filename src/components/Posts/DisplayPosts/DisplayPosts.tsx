import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { fetchData } from '../../../utils/fetch';
import { InterfaceDisplayPosts } from '../../Interfaces/InterfaceDisplayPosts';

interface DisplayPostsProps {
  sessionToken: string;
}

interface DisplayPostsState {
  data: InterfaceDisplayPosts[];
}

export default class DisplayPosts extends Component<
  DisplayPostsProps,
  DisplayPostsState
> {
  constructor(props: DisplayPostsProps) {
    super(props);
    this.state = { data: [] };
  }
  url: string = 'http://localhost:4000/posts';

  async componentDidMount() {
    this.setState({
      data: await fetchData(this.url, 'GET', this.props.sessionToken),
    });
  }

  deletePost = async (postId: number) => {
    this.url = `${this.url}/${postId}`;

    this.setState({
      data: await fetchData(this.url, 'DELETE', this.props.sessionToken),
    });
  };

  render() {
    return (
      <>
        <p>Post Form</p>
        {this.state.data?.map((data: InterfaceDisplayPosts) => {
          return (
            <>
              <h1>{data.title}</h1>
              <p>{data.city}</p>
              <p>{new Date(data.cal_date).toLocaleDateString()}</p>
              <Button
                variant='danger'
                className='me-3'
                onClick={() => this.deletePost(data.id)}
              >
                Delete Post
              </Button>
            </>
          );
        })}
      </>
    );
  }
}
