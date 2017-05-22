import React from 'react';
import { Alert } from 'react-bootstrap';

const NotFound = () => (
  <div className="NotFound">
    <Alert bsStyle="danger">
      <p><strong>[404] Erreur </strong>: { window.location.pathname } n'existe pas.</p>
    </Alert>
  </div>
);

export default NotFound;
