import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>Rock</h2>
      <p>A starting point for Meteor applications.</p>
      <p><a className="btn btn-success" href="https://github.com/ggallon/rock" target="_blank" role="button">Read the Documentation</a></p>
      <p style={{ fontSize: '16px', color: '#aaa' }}>Currently at v1.0.0</p>
    </Jumbotron>
  </div>
);

export default Index;
