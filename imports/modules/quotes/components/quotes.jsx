import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import QuotesList from './quotesList';

const Quotes = () => (
  <div className="Quotes">
    <Row>
      <Col xs={12}>
        <div className="page-header clearfix">
          <h4 className="pull-left">Devis</h4>
          <Link to="/quotes/new">
            <Button bsStyle="success" bsSize="small" className="pull-right">
              <span className="visible-lg-block visible-md-block">Nouveau devis</span>
              <span className="visible-sm-block">Nouveau</span>
              <span className="visible-xs-block"><Glyphicon glyph="plus" /></span>
            </Button>
          </Link>
        </div>
        <QuotesList />
      </Col>
    </Row>
  </div>
);

export default Quotes;
