import React, { Component } from 'react';

interface ComplaintsProps {
  sessionToken: string;
}

export default class Complaints extends Component<ComplaintsProps> {
  render() {
    return (
      <div>
        <h1>Reported HOA Violations</h1>
      </div>
    );
  }
}
