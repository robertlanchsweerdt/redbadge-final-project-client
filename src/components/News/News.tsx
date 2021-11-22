import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { fetchData } from '../../utils/fetch';
import DisplayNews from './DisplayNews/DisplayNews';

interface NewsProps {
  sessionToken: string;
  userId: string;
  userRole: string;
  updateReadNewsArticle: Function;
}

interface NewsState {
  data: Array<{
    id: number;
    title: string;
    narrative: string;
    cal_date?: any;
    photos?: Object;
    author: string;
    createdAt: Date;
    updatedAt?: Date;
    userId: string;
  }>;
}

export default class News extends Component<NewsProps, NewsState> {
  constructor(props: NewsProps) {
    super(props);
    this.state = { data: [] };
  }

  sortAZ() {
    this.setState({
      data: this.state.data.sort(
        (a: { createdAt: Date }, b: { createdAt: Date }) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        }
      ),
    });
  }

  url: string = `http://localhost:4000/news`;

  fetchNews = async () => {
    await this.setState({
      data: await fetchData(this.url, 'GET', this.props.sessionToken),
    });
    this.sortAZ();
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
              to='/create-news'
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
          updateReadNewsArticle={this.props.updateReadNewsArticle}
          fetchNews={this.fetchNews}
        />
      </>
    );
  }
}
