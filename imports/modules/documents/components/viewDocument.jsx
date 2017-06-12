import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import Alert from 'react-bootstrap/lib/Alert';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import container from '/imports/lib/container';
import Documents from '/imports/api/documents/documents';
import { removeDocument } from '/imports/api/documents/methods';
import NotFound from '/imports/ui/components/notFound';
import Loading from '/imports/ui/components/loading';

class ViewDocument extends Component {
  constructor() {
    super();

    this.state = { handleRemoveError: null};

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(_id) {
    const { history } = this.props;
    if (confirm('Êtes-vous sûr ? Ceci est définitif !')) {
      removeDocument.call({ _id }, (error) => {
        if (error) {
          this.setState({ handleRemoveError: error.reason });
        } else {
          history.push('/documents');
        }
      });
    }
  }

  render() {
    const { doc, history } = this.props;

    return (
      doc ? (
        <div className="ViewDocument">
          {this.state.handleRemoveError ? (
            <Alert bsStyle="danger">
              {this.state.handleRemoveError}
            </Alert>
          ) : ''}
          <div className="page-header clearfix">
            <h4 className="pull-left">{ doc && doc.title }</h4>
            <ButtonToolbar className="pull-right">
              <ButtonGroup bsSize="small">
                <Button onClick={() => history.push(`/documents/${doc._id}/edit`)}>Modifier</Button>
                <Button onClick={() => this.handleRemove(doc._id)} className="text-danger">Supprimer</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
          { doc && doc.body }
        </div>
      ) : <NotFound />
    );
  }
}

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
