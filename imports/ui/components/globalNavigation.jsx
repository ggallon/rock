import { Meteor } from 'meteor/meteor';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';

import container from '/imports/lib/container';
import PublicNavigation from './publicNavigation';
import AuthenticatedNavigation from './authenticatedNavigation';

const renderNavigation = hasUser => (hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />);

const GlobalNavigation = ({ hasUser }) => (
  <Navbar fixedTop collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Rock</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      { renderNavigation(hasUser) }
    </Navbar.Collapse>
  </Navbar>
);

GlobalNavigation.propTypes = {
  hasUser: PropTypes.object,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('users.info');
  if (subscription.ready()) {
    onData(null, { hasUser: Meteor.user() });
  }
}, GlobalNavigation);
