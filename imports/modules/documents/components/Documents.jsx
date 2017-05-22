import React from 'react';
import { Link } from 'react-router-dom';
// import { Row, Col, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import DocumentsList from './DocumentsList';

const Documents = () => (
  <div className="Documents">
    <Row>
      <Col xs={12}>
        <div className="page-header clearfix">
          <h4 className="pull-left">Documents</h4>
          <Link to="/documents/new">
            <Button bsStyle="success" className="pull-right">Nouveau document</Button>
          </Link>
        </div>
        <DocumentsList />
      </Col>
    </Row>
  </div>
);

export default Documents;
