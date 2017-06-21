import { Meteor } from 'meteor/meteor';
import React from 'react';
import { PropTypes } from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const AuthenticatedNavigation = props => (
  <div>
    <Nav>
      <LinkContainer to="/documents">
        <NavItem eventKey={2} href="/documents">Documents</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={3} title={props.name} id="basic-nav-dropdown">
        <MenuItem eventKey={3.1} onClick={() => Meteor.logout()}>Se déconnecter</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.defaultProps = {
  name: '',
};

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AuthenticatedNavigation;
