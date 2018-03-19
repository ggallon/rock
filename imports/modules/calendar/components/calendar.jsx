import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import CalendarYear from './calendarYear';

const CalendarView = () => (
  <div className="Calendar-view">
    <Row>
      <Col xs={12}>
        <div className="page-header clearfix">
          <h4 className="pull-left">Calendrier</h4>
          <Link to="/calendar/test">
            <Button bsStyle="success" bsSize="small" className="pull-right">
              <span className="visible-lg-block visible-md-block">long test</span>
              <span className="visible-sm-block">test</span>
              <span className="visible-xs-block"><Glyphicon glyph="plus" /></span>
            </Button>
          </Link>
        </div>
        <CalendarYear />
      </Col>
    </Row>
  </div>
);

export default CalendarView;