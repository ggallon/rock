import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import DocumentsList from './documentsList';

const Documents = () => (
  <div className="Documents">
    <Row>
      <Col xs={12}>
        <div className="page-header clearfix">
          <h4 className="pull-left">Documents</h4>
          <Link to="/documents/new">
            <Button bsStyle="success" className="pull-right">
              <span className="visible-lg-block">Nouveau document</span>
              <span className="visible-md-block visible-sm-block">Nouveau</span>
              <span className="visible-xs-block"><Glyphicon glyph="plus" /></span>
            </Button>
          </Link>
        </div>
        <DocumentsList />
      </Col>
    </Row>
  </div>
);

export default Documents;
