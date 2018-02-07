import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Quotes from '../../../api/quotes/quotes';
import container from '../../../lib/container';
import Loading from '../../../ui/components/loading';
import NotFound from '../../../ui/components/notFound';
import QuoteEditor from './quoteEditor';

const EditQuote = ({ quote }) => (
  quote ? (
    <div className="EditQuote">
      <h4 className="page-header">Modifier &quot;{quote.title}&quot;</h4>
      <QuoteEditor quote={quote} />
    </div>
  ) : <NotFound />
);

EditQuote.propTypes = {
  quote: PropTypes.object.isRequired,
};

export default container(({ match }, onData) => {
  const quoteId = match.params._id;
  const subscription = Meteor.subscribe('quotes.view', quoteId);

  if (subscription.ready()) {
    const quote = Quotes.findOne(quoteId);
    onData(null, { quote });
  }
}, EditQuote, { loadingHandler: () => <Loading /> });
