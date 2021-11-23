import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { InterfaceNews } from '../InterfaceNews';
import { changeData } from '../../../utils/fetch';
import ConfirmMessage from '../../../utils/ConfirmMessage';
import APIURL from '../../../helpers/environment';

interface DisplayNewsProps {
  sessionToken: string;
  data: InterfaceNews[];
  userId: string;
  userRole: string;
  updateReadNewsArticle: Function;
  fetchNews: Function;
}

interface DisplayNewsState {
  show: boolean;
  redirect: string;
  deleteUser: boolean;
  targetedDeleteUserName: string;
  targetedDeleteUserId: number;
  modalMessage: string;
}

export default class DisplayNews extends Component<
  DisplayNewsProps,
  DisplayNewsState
> {
  constructor(props: DisplayNewsProps) {
    super(props);
    this.state = {
      show: false,
      redirect: '',
      deleteUser: false,
      targetedDeleteUserName: '',
      targetedDeleteUserId: 0,
      modalMessage: '',
    };
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  confirmDeleteMessage = (newsTitle: string, targetedNewsId: number) => {
    this.setState({
      targetedDeleteUserName: `News: ${newsTitle}`,
      modalMessage: `Are you sure you want to delete this news post?`,
      show: true,
      targetedDeleteUserId: targetedNewsId,
    });
  };

  confirmDeleteUser = () => {
    this.setState({ show: false, deleteUser: true });
    this.deleteNewsPost();
  };

  deleteNewsPost = async () => {
    const reqBody = {};
    const url: string = `${APIURL}/news/${this.state.targetedDeleteUserId}`;

    await changeData(url, 'DELETE', reqBody, this.props.sessionToken);
  };

  componentDidUpdate(prevProps: DisplayNewsProps, prevState: DisplayNewsState) {
    if (prevState.deleteUser !== this.state.deleteUser) {
      this.props.fetchNews();
    }
  }

  render() {
    return (
      <>
        {this.props.data.length < 1 ? (
          <h2>No neighhorhood news at this time.</h2>
        ) : (
          <div className='row'>
            {this.props.data.map((news: InterfaceNews) => {
              return (
                <div className='col-sm-6' key={news.id}>
                  <div
                    className='card mb-4'
                    style={{ backgroundColor: '#f8f9fa' }}
                  >
                    <div className='card-body'>
                      <h4 className='card-title'>{news.title}</h4>
                      <p className='fst-italic mb-0 fw-light text-secondary'>
                        Author: {news.author}
                      </p>
                      <p className='fst-italic fw-light text-secondary'>
                        Created on:{' '}
                        {new Date(news.createdAt).toLocaleDateString()}
                      </p>
                      <p className='card-text mt-2'>
                        {news.narrative.substr(0, 150) + '...'}
                      </p>
                      <Button
                        onClick={() =>
                          this.props.updateReadNewsArticle(news.id)
                        }
                      >
                        <Link to='/read-news' className='text-decoration-none'>
                          Read
                        </Link>
                      </Button>
                      {(this.props.userId === news.userId ||
                        this.props.userRole === 'admin') && (
                        <>
                          <Button
                            variant='danger'
                            className='ms-3'
                            onClick={() =>
                              this.confirmDeleteMessage(news.title, news.id)
                            }
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <ConfirmMessage
              show={this.state.show}
              handleClose={this.handleClose}
              confirmDeleteUser={this.confirmDeleteUser}
              modalMessage={this.state.modalMessage}
              targetedDeleteUserName={this.state.targetedDeleteUserName}
              deleteUser={this.state.deleteUser}
            />
          </div>
        )}
      </>
    );
  }
}
