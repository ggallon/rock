import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import PublicNavigation from './publicNavigation';
import AuthenticatedNavigation from './authenticatedNavigation';

const GlobalNavigation = props => (
  <Navbar fixedTop collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Rock</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {!props.authenticated ? <PublicNavigation /> : <AuthenticatedNavigation {...props} />}
    </Navbar.Collapse>
  </Navbar>
);

GlobalNavigation.defaultProps = {
  authenticated: false,
};

GlobalNavigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default GlobalNavigation;
