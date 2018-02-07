import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Alert from 'react-bootstrap/lib/Alert';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Quotes from '../../../api/quotes/quotes';
import container from '../../../lib/container';
import { timeago, dayMonthYearAtTime } from '../../../lib/dates';
import Loading from '../../../ui/components/loading';
import NotFound from '../../../ui/components/notFound';

class ViewQuote extends Component {
  constructor() {
    super();

    this.state = { handleRemoveError: null };

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(_id, history) {
    if (confirm('Êtes-vous sûr ? Ceci est définitif !')) {
      Meteor.call('quotes.remove', { _id }, (error) => {
        if (error) {
          this.setState({ handleRemoveError: error.reason });
        } else {
          history.push('/quotes');
        }
      });
    }
  }

  render() {
    const { quote, history, match, user } = this.props;
    const quoteOwnerIsUser = quote.ownerId !== user._id;

    return (
      quote ? (
        <div className="ViewQuote">
          {this.state.handleRemoveError && (
            <Alert bsStyle="danger">
              {this.state.handleRemoveError}
            </Alert>
          )}
          <div className="page-header clearfix">
            <h4 className="pull-left">{ quote.title }</h4>
            <ButtonToolbar className="pull-right">
              <ButtonGroup bsSize="small">
                <Button onClick={() => history.push(`${match.url}/edit`)} disabled={quoteOwnerIsUser}>Modifier</Button>
                <Button onClick={() => this.handleRemove(quote._id, history)} disabled={quoteOwnerIsUser} className="text-danger">Supprimer</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
          <div>
            <p>{ quote.body }</p>
            <p><b>{ quote.updatedAt && `Modifié ${timeago(quote.updatedAt, 'Europe/Paris')}` }</b></p>
            <p><i>Créé le { dayMonthYearAtTime(quote.createdAt, 'Europe/Paris') }</i></p>
          </div>
        </div>
      ) : <NotFound />
    );
  }
}

ViewQuote.propTypes = {
  quote: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default container(({ match }, onData) => {
  const quoteId = match.params._id;
  const subscription = Meteor.subscribe('quotes.view', quoteId);

  if (subscription.ready()) {
    const quote = Quotes.findOne(quoteId);
    onData(null, { quote });
  }
}, ViewQuote, { loadingHandler: () => <Loading /> });
