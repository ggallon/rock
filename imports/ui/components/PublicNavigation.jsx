import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
  <Nav pullRight>
    <LinkContainer to="/signup">
      <NavItem eventKey={2}>S'enregistrer</NavItem>
    </LinkContainer>
    <LinkContainer to="/login">
      <NavItem eventKey={3}>Se connecter</NavItem>
    </LinkContainer>
  </Nav>
);

export default PublicNavigation;
