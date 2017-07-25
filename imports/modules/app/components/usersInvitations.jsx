import React from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Alert from 'react-bootstrap/lib/Alert';
import Loading from '/imports/ui/components/loading';
import container from '/imports/lib/container';
import Invitations from '/imports/api/invitations/invitations';

const UsersInvitations = ({ invitations, history }) => (
  invitations.length > 0 ? (
    <ListGroup className="UsersList">
      {invitations.map(({ _id, emailAddress }) => (
        <ListGroupItem key={_id} onClick={() => history.push(`/invitations/${_id}`)}>
          { emailAddress }
        </ListGroupItem>
      ))}
    </ListGroup>
  ) : <Alert bsStyle="warning">Aucune invitation envoyée</Alert>
);

UsersInvitations.defaultProps = {
  invitations: [],
};

UsersInvitations.propTypes = {
  invitations: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('invitations.list');

  if (subscription.ready()) {
    const invitations = Invitations.find().fetch();
    onData(null, { invitations });
  }
}, UsersInvitations, { loadingHandler: () => <Loading /> });
