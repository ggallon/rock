import { Meteor } from 'meteor/meteor';
import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

import Documents from '/imports/api/documents/documents';
import container from '/imports/lib/container';
import Loading from '/imports/client/ui/components/Loading';

const DocumentsList = ({ documents, history }) => (
  documents.length > 0 ? <ListGroup className="DocumentsList">
    {documents.map(({ _id, title }) => (
      <ListGroupItem key={_id} onClick={() => history.push(`/documents/${_id}`)}>
        { title }
      </ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No documents yet.</Alert>
);

DocumentsList.defaultProps = {
  documents: [],
  history: null,
};

DocumentsList.propTypes = {
  documents: PropTypes.array,
  history: PropTypes.object,
};

export default withRouter(container((props, onData) => {
  const subscription = Meteor.subscribe('documents.list');
  if (subscription.ready()) {
    const documents = Documents.find().fetch();
    onData(null, { documents });
  }
}, DocumentsList, { loadingHandler: () => <Loading /> }));

