import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Tab from 'react-bootstrap/lib/Tab';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import UsersList from './usersList';
import UsersInvitations from './usersInvitations';

const Users = props => (
  <div className="Users">
    <Row>
      <Col xs={12}>
        <div className="page-header clearfix">
          <h4 className="pull-left">Gestion des utilisateurs</h4>
          <div className="pull-right">
            <DropdownButton bsSize="small" title="Actions" pullRight id="users-dropdown">
              <LinkContainer to="/users/new">
                <MenuItem eventKey="1"><Glyphicon glyph="user" /> Ajouter utilisateur</MenuItem>
              </LinkContainer>
              <LinkContainer to="#">
                <MenuItem eventKey="2"><Glyphicon glyph="send" /> Envoyer invitation</MenuItem>
              </LinkContainer>
            </DropdownButton>
          </div>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col xs={12} sm={3} md={2} lg={2}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">Utilisateurs</NavItem>
                <NavItem eventKey="second">Invitation(s)</NavItem>
              </Nav>
            </Col>
            <Col xs={12} sm={9} md={10} lg={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <UsersList {...props} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <UsersInvitations {...props} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Col>
    </Row>
  </div>
);

export default Users;
