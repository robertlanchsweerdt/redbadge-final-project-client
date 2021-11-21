import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { InterfaceNews } from '../InterfaceNews';

interface DisplayNewsProps {
  sessionToken: string;
  data: InterfaceNews[];
  userId: string;
  userRole: string;
}

interface DisplayNewsState {}

export default class DisplayNews extends Component<
  DisplayNewsProps,
  DisplayNewsState
> {
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
                  <div className='card mb-4'>
                    <div className='card-body'>
                      <h5 className='card-title'>{news.title}</h5>
                      <small className='fst-italic'>
                        Created on:{' '}
                        {new Date(news.createdAt).toLocaleDateString()}
                      </small>
                      <p className='card-text mt-2'>
                        {news.narrative.substr(0, 10) + '...'}
                      </p>
                      <Button>Read news</Button>
                      {(this.props.userId === news.userId ||
                        this.props.userRole === 'admin') && (
                        <>
                          <Button variant='warning' className='ms-3'>
                            Edit
                          </Button>
                          <Button variant='danger' className='ms-3'>
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}
