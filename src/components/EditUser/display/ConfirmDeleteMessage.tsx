import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ConfirmDeleteMessageProps {
  show: boolean;
  handleClose: Function;
  confirmDeleteUser: Function;
  modalMessage: string;
  targetedDeleteUserName: string;
  deleteUser: boolean;
  redirectPage: Function;
}

export default class ConfirmDeleteMessage extends Component<ConfirmDeleteMessageProps> {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-dark'>
            {this.props.targetedDeleteUserName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-dark'>{this.props.modalMessage}</Modal.Body>
        <Modal.Footer>
          {this.props.deleteUser ? (
            <Button variant='primary' onClick={() => this.props.redirectPage()}>
              Close
            </Button>
          ) : (
            <>
              <Button
                variant='danger'
                onClick={() => this.props.confirmDeleteUser()}
              >
                Confirm
              </Button>
              <Button
                variant='secondary'
                onClick={() => this.props.handleClose()}
              >
                Cancel
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}
