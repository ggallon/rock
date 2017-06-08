import { Meteor } from 'meteor/meteor';
import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import container from '/imports/lib/container';
import Documents from '/imports/api/documents/documents';
import NotFound from '/imports/ui/components/notFound';
import Loading from '/imports/ui/components/loading';
import DocumentEditor from './documentEditor';

const EditDocument = ({ doc }) => (
  doc ? (
    <div className="EditDocument">
      <h4 className="page-header">Modifier &quot;{doc.title}&quot;</h4>
      <DocumentEditor doc={doc} />
    </div>
  ) : <NotFound />
);

EditDocument.propTypes = {
  doc: PropTypes.object.isRequired,
};

export default withRouter(container((props, onData) => {
  const documentId = props.match.params._id;
  const subscription = Meteor.subscribe('documents.view', documentId);

  if (subscription.ready()) {
    const doc = Documents.findOne(documentId);
    onData(null, { doc });
  }
}, EditDocument, { loadingHandler: () => <Loading /> }));
