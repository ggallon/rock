import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import rateLimit from '../../lib/rate-limit';
import Quotes from './quotes';

export const insertQuote = new ValidatedMethod({
  name: 'quotes.insert',
  validate: Quotes.schema.pick('title', 'body').validator(),
  run(quote) {
    if (!this.userId) {
      throw new Meteor.Error(
        'quotes.insert.notLoggedIn',
        'Must be logged in to inser a quote',
      );
    }

    return Quotes.insert({
      ...quote,
      ownerId: this.userId,
    });
  },
});

export const updateQuote = new ValidatedMethod({
  name: 'quotes.update',
  validate: Quotes.schema.pick('_id', 'title', 'body', 'ownerId', 'createdAt', 'updatedAt').validator(),
  run(quote) {
    if (!this.userId) {
      throw new Meteor.Error(
        'quotes.update.notLoggedIn',
        'Must be logged in to update a quote',
      );
    }

    if (quote._id && quote.ownerId !== this.userId) {
      throw new Meteor.Error(
        'quotes.update.accessDenied',
        'You don\'t have permission to update this quote.',
      );
    }

    try {
      const quoteId = quote._id;
      delete quote._id;
      delete quote.ownerId;
      delete quote.createdAt;
      Quotes.update({ _id: quoteId }, { $set: quote });
      return quoteId; // Return _id so we can redirect to quote after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

export const removeQuote = new ValidatedMethod({
  name: 'quotes.remove',
  validate: Quotes.schema.pick('_id').validator(),
  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error(
        'quotes.remove.notLoggedIn',
        'Must be logged in to remove a quote.',
      );
    }

    const quote = Quotes.findOne(_id);

    if (quote.ownerId !== this.userId) {
      throw new Meteor.Error(
        'quotes.remove.accessDenied',
        'You don\'t have permission to remove this quote.',
      );
    }

    try {
      return Quotes.remove(_id);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'quotes.insert',
    'quotes.update',
    'quotes.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
