import React from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Documents from '../../../api/documents/documents';
import container from '../../../lib/container';
import Loading from '../../../ui/components/loading';
import NotFound from '../../../ui/components/notFound';
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

export default container(({ match }, onData) => {
  const docId = match.params._id;
  const subscription = Meteor.subscribe('documents.view', docId);

  if (subscription.ready()) {
    const doc = Documents.findOne(docId);
    onData(null, { doc });
  }
}, EditDocument, { loadingHandler: () => <Loading /> });
