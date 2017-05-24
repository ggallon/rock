import { Meteor } from 'meteor/meteor';
import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const userName = () => {
  const user = Meteor.user();
  const name = user ? user.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = ({ history }) => (
  <div>
    <Nav>
      <LinkContainer to="/documents">
        <NavItem eventKey={2} href="/documents">Documents</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={3} title={userName()} id="basic-nav-dropdown">
        <MenuItem eventKey={3.1} onClick={() => Meteor.logout(() => history.push('/login'))}>Se déconnecter</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.defaultProps = {
  history: null,
};

AuthenticatedNavigation.propTypes = {
  history: PropTypes.object,
};

export default withRouter(AuthenticatedNavigation);
