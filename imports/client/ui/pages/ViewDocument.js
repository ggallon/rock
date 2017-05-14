import { Meteor } from 'meteor/meteor';
import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import container from '/imports/lib/container';
import Documents from '/imports/api/documents/documents';
import { removeDocument } from '/imports/api/documents/methods';
import Loading from '/imports/client/ui/components/Loading';
import NotFound from './NotFound';

const handleRemove = (history, _id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeDocument.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
        history.push('/documents');
      }
    });
  }
};

const ViewDocument = ({ doc, history }) => (
  doc ? (
    <div className="ViewDocument">
      <div className="page-header clearfix">
        <h4 className="pull-left">{ doc && doc.title }</h4>
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={() => history.push(`/documents/${doc._id}/edit`)}>Edit</Button>
            <Button onClick={() => handleRemove(history, doc._id)} className="text-danger">Delete</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      { doc && doc.body }
    </div>
  ) : (
    <NotFound />
  )
);

ViewDocument.defaultProps = {
  doc: null,
  history: null,
};

ViewDocument.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(container((props, onData) => {
  const documentId = props.match.params._id;
  const subscription = Meteor.subscribe('documents.view', documentId);

  if (subscription.ready()) {
    const doc = Documents.findOne(documentId);
    onData(null, { doc });
  }
}, ViewDocument, { loadingHandler: () => <Loading /> }));

