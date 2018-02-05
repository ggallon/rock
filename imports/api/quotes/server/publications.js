import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Quotes from '../quotes';

Meteor.publish('quotes.list', function quotesListPublish() {
  if (!this.userId) {
    return this.ready();
  }

  return Quotes.find({}, {
    fields: {
      title: 1,
      body: 1,
    },
    sort: { createdAt: -1 },
  });
});

Meteor.publish('quotes.view', function quotesViewPublish(quoteId) {
  if (!this.userId) {
    return this.ready();
  }

  check(quoteId, String);

  return Quotes.find({ _id: quoteId }, {
    fields: {
      title: 1,
      body: 1,
      ownerId: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  });
});
