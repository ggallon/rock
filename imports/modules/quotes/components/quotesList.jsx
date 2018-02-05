import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Alert from 'react-bootstrap/lib/Alert';
import Quotes from '../../../api/quotes/quotes';
import container from '../../../lib/container';
import Loading from '../../../ui/components/loading';

const QuotesList = ({ quotes, history }) => (
  quotes.length > 0 ? (
    <ListGroup className="QuotesList">
      {quotes.map(({ _id, title }) => (
        <ListGroupItem key={_id} onClick={() => history.push(`/quotes/${_id}`)}>
          { title }
        </ListGroupItem>
      ))}
    </ListGroup>
  ) : <Alert bsStyle="warning">Aucun devis</Alert>
);

QuotesList.propTypes = {
  quotes: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(container((props, onData) => {
  const subscription = Meteor.subscribe('quotes.list');

  if (subscription.ready()) {
    const quotes = Quotes.find().fetch();
    onData(null, { quotes });
  }
}, QuotesList, { loadingHandler: () => <Loading /> }));
