import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Table from 'react-bootstrap/lib/Table';
import Label from 'react-bootstrap/lib/Label';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Loading from '../../../ui/components/loading';
import container from '../../../lib/container';
import capitalize from '../../../lib/capitalize';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.checkIfCurrentUser = this.checkIfCurrentUser.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.authorizeAccess = this.authorizeAccess.bind(this);
  }

  componentWillMount() {
    this.authorizeAccess();
  }

  componentDidUpdate() {
    this.authorizeAccess();
  }

  checkIfCurrentUser(mappedUserId) {
    const { user } = this.props;
    return mappedUserId === user._id;
  }

  handleChangeRole(_id, role) {
    Meteor.call('users.changeRole', { _id, role }, (error) => {
      if (error) {
        console.warm(error.reason);
      } else {
        console.log('Role updated!');
      }
    });
  }

  authorizeAccess() {
    const { user, history } = this.props;

    if (!Roles.userIsInRole(user, ['super-admin', 'admin'])) {
      history.push('/');
    }
  }

  render() {
    const { users, applicationRoles, history } = this.props;
    return (
      <Table bordered responsive>
        <thead>
          <tr>
            <th>E-mail</th>
            <th>Rôle(s)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ _id, emails, roles }) => {
            const isCurrentUser = this.checkIfCurrentUser(_id);
            return (
              <tr key={_id}>
                <td className="vertical-align" width="40%">
                  {isCurrentUser && (<Label bsStyle="success">You!</Label>)}
                  {` ${emails[0].address}`}
                </td>
                <td>
                  <select
                    className="form-control input-sm"
                    value={roles ? roles[0] : 'Aucun'}
                    disabled={isCurrentUser}
                    onChange={(event) => { this.handleChangeRole(_id, event.target.value); }}
                  >
                    {applicationRoles.map(({ name }) => (
                      <option key={name} value={name}>{capitalize(name)}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <ButtonGroup>
                    <Button bsSize="small" onClick={() => history.push(`/users/${_id}`)}>
                      <Glyphicon glyph="eye-open" />
                    </Button>
                    <Button bsStyle="success" bsSize="small" onClick={() => history.push(`/users/${_id}/edit`)}>
                      <Glyphicon glyph="edit" />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

UsersList.defaultProps = {
  user: Object.create(null),
  users: [],
  applicationRoles: [],
};

UsersList.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  applicationRoles: PropTypes.array,
  history: PropTypes.object.isRequired,
};

export default withRouter(container((props, onData) => {
  const subscription = Meteor.subscribe('users.list');

  if (subscription.ready() && Roles.subscription.ready()) {
    const users = Meteor.users.find().fetch();
    const applicationRoles = Roles.getAllRoles().fetch();
    onData(null, { users, applicationRoles });
  }
}, UsersList, { loadingHandler: () => <Loading /> }));
