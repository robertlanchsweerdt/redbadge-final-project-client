import React, { Component } from 'react';

interface ComplaintsProps {
  sessionToken: string;
}

export default class Complaints extends Component<ComplaintsProps> {
  render() {
    return (
      <div>
        <h1>HOA Complaints</h1>
      </div>
    );
  }
}
