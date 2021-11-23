import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { InterfaceNews } from '../InterfaceNews';
import { changeData, fetchData } from '../../../utils/fetch';
import APIURL from '../../../helpers/environment';

interface ReadNewsProps {
  sessionToken: string;
  newsId: number;
  userId: string;
  userRole: string;
}

interface ReadNewsState {
  data: InterfaceNews;
  editNews: boolean;
}

export default class ReadNews extends Component<ReadNewsProps, ReadNewsState> {
  constructor(props: ReadNewsProps) {
    super(props);
    this.state = {
      data: {
        id: 0,
        title: '',
        narrative: '',
        author: '',
        createdAt: new Date(),
        userId: '',
      },
      editNews: false,
    };
  }

  fetchArticle = async () => {
    const url: string = `${APIURL}/news/${this.props.newsId}`;

    this.setState({
      data: await fetchData(url, 'GET', this.props.sessionToken),
    });
  };

  updateArticle = async () => {
    const reqBody: Object = { narrative: this.state.data.narrative };

    const url: string = `${APIURL}/news/${this.props.newsId}`;

    await changeData(url, 'PUT', reqBody, this.props.sessionToken);

    // set editNews to false to disable edit buttons
    this.setState({ editNews: false });

    // refresh page to show changes
    this.fetchArticle();
  };

  cancelUpdate = () => {
    this.setState({ editNews: false });
    this.fetchArticle();
  };

  componentDidMount = async () => {
    this.fetchArticle();
  };

  render() {
    return (
      <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        {this.state.data ? (
          <>
            <h1 className='mb-2'>{this.state.data.title}</h1>
            <p className='text-secondary fst-italic mb-0 fw-light'>
              Author: {this.state.data.author}
            </p>
            <p className='text-secondary fst-italic mb-0 fw-light'>
              Published:{' '}
              {new Date(this.state.data.createdAt).toLocaleDateString()}
            </p>

            {/* show textarea if editing news */}
            {this.state.editNews && (
              <textarea
                className='mt-4'
                style={{ width: '100%', height: '500px' }}
                value={this.state.data.narrative}
                onChange={(e) =>
                  this.setState((prevState) => {
                    let data = Object.assign({}, prevState.data);
                    data.narrative = e.target.value;
                    return { data };
                  })
                }
              />
            )}

            {/* only show if NOT editing news */}
            {!this.state.editNews && (
              <p
                style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}
                className='mt-3'
              >
                {this.state.data.narrative}
              </p>
            )}

            <hr />

            {/* hide Return button if editing */}
            {!this.state.editNews && (
              <Button variant='secondary'>
                <Link to='/neighborhood-news' className='text-decoration-none'>
                  Return to Neighborhood News
                </Link>
              </Button>
            )}

            {/* below buttons only available based on role */}

            {(this.props.userId === this.state.data.userId ||
              this.props.userRole === 'admin') && (
              <>
                {/* only show edit button if NOT editing  */}

                {!this.state.editNews && (
                  <Button
                    variant='warning'
                    className='ms-3'
                    onClick={() => this.setState({ editNews: true })}
                  >
                    Edit
                  </Button>
                )}

                {/* show (2) button if YES editing */}

                {this.state.editNews && (
                  <>
                    <Button
                      variant='primary'
                      className='ms-3'
                      onClick={this.updateArticle}
                    >
                      Submit Changes
                    </Button>

                    <Button
                      variant='secondary'
                      className='ms-3'
                      onClick={this.cancelUpdate}
                    >
                      Cancel Changes
                    </Button>
                  </>
                )}
              </>
            )}
            {/* end role permissions for button grouping */}
          </>
        ) : (
          <>
            <p>
              Your request did not properly load. Return to the Neighborhood
              News Page
            </p>
            <Button variant='secondary'>
              <Link to='/neighborhood-news' className='text-decoration-none'>
                Return to Neighborhood News
              </Link>
            </Button>
          </>
        )}
      </div>
    );
  }
}
