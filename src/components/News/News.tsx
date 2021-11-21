import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { fetchData } from '../../utils/fetch';
import DisplayNews from './DisplayNews/DisplayNews';
import { InterfaceNews } from './InterfaceNews';

interface NewsProps {
  sessionToken: string;
  userId: string;
  userRole: string;
}

interface NewsState {
  data: InterfaceNews[];
}

export default class News extends Component<NewsProps, NewsState> {
  constructor(props: NewsProps) {
    super(props);
    this.state = { data: [] };
  }

  url: string = `http://localhost:4000/news`;

  fetchNews = async () => {
    await this.setState({
      data: await fetchData(this.url, 'GET', this.props.sessionToken),
    });
  };

  componentDidMount() {
    this.fetchNews();
  }

  render() {
    return (
      <>
        <h1>Neighborhood News</h1>
        {(this.props.userRole === 'admin' ||
          this.props.userRole === 'member') && (
          <Button variant='secondary' className='mb-5'>
            <Link
              to='/create-post'
              className='d-flex flex-row-reverse justify-content-center align-items-center text-decoration-none'
            >
              <Plus color='white' size={30} className='p-0' />
              Create a News Post
            </Link>
          </Button>
        )}

        <DisplayNews
          sessionToken={this.props.sessionToken}
          data={this.state.data}
          userId={this.props.userId}
          userRole={this.props.userRole}
        />
      </>
    );
  }
}
