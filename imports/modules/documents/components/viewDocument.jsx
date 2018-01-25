import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Alert from 'react-bootstrap/lib/Alert';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Documents from '../../../api/documents/documents';
import container from '../../../lib/container';
import { timeago, dayMonthYearAtTime } from '../../../lib/dates';
import Loading from '../../../ui/components/loading';
import NotFound from '../../../ui/components/notFound';

class ViewDocument extends Component {
  constructor() {
    super();

    this.state = { handleRemoveError: null };

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(_id, history) {
    if (confirm('Êtes-vous sûr ? Ceci est définitif !')) {
      Meteor.call('documents.remove', { _id }, (error) => {
        if (error) {
          this.setState({ handleRemoveError: error.reason });
        } else {
          history.push('/documents');
        }
      });
    }
  }

  render() {
    const { doc, history, match, user } = this.props;

    return (
      doc ? (
        <div className="ViewDocument">
          {this.state.handleRemoveError ? (
            <Alert bsStyle="danger">
              {this.state.handleRemoveError}
            </Alert>
          ) : ''}
          <div className="page-header clearfix">
            <h4 className="pull-left">{ doc.title }</h4>
            <ButtonToolbar className="pull-right">
              <ButtonGroup bsSize="small">
                <Button onClick={() => history.push(`${match.url}/edit`)} disabled={doc.owner !== user._id}>Modifier</Button>
                <Button onClick={() => this.handleRemove(doc._id, history)} disabled={doc.owner !== user._id} className="text-danger">Supprimer</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
          <div>
            <p>{ doc.body }</p>
            <p><b>{ doc.updatedAt && `Modifié ${timeago(doc.updatedAt, 'Europe/Paris')}` }</b></p>
            <p><i>Créé le { dayMonthYearAtTime(doc.createdAt) }</i></p>
          </div>
        </div>
      ) : <NotFound />
    );
  }
}

ViewDocument.propTypes = {
  doc: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default container(({ match }, onData) => {
  const docId = match.params._id;
  const subscription = Meteor.subscribe('documents.view', docId);

  if (subscription.ready()) {
    const doc = Documents.findOne(docId);
    onData(null, { doc });
  }
}, ViewDocument, { loadingHandler: () => <Loading /> });
