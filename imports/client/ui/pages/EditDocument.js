import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import container from '/imports/lib/container';
import Loading from '/imports/client/ui/components/Loading';
import Documents from '/imports/api/documents/documents';
import DocumentEditor from '/imports/client/ui/components/DocumentEditor';
import NotFound from '/imports/client/ui/pages/NotFound';


const EditDocument = ({ doc }) => (doc ? (
  <div className="EditDocument">
    <h4 className="page-header">Editing &quot;{doc.title}&quot;</h4>
    <DocumentEditor doc={doc} />
  </div>
) : <NotFound />);

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

