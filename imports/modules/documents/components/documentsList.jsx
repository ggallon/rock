import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Alert from 'react-bootstrap/lib/Alert';
import Documents from '/imports/api/documents/documents';
import container from '/imports/lib/container';
import Loading from '/imports/ui/components/loading';

const DocumentsList = ({ documents, history }) => (
  documents.length > 0 ? (
    <ListGroup className="DocumentsList">
      {documents.map(({ _id, title }) => (
        <ListGroupItem key={_id} onClick={() => history.push(`/documents/${_id}`)}>
          { title }
        </ListGroupItem>
      ))}
    </ListGroup>
  ) : <Alert bsStyle="warning">Aucun document</Alert>
);

DocumentsList.defaultProps = {
  documents: [],
};

DocumentsList.propTypes = {
  documents: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(container((props, onData) => {
  const subscription = Meteor.subscribe('documents.list');

  if (subscription.ready()) {
    const documents = Documents.find().fetch();
    onData(null, { documents });
  }
}, DocumentsList, { loadingHandler: () => <Loading /> }));
