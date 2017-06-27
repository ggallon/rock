import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import rateLimit from '/imports/lib/rate-limit';
import Documents from './documents';

export const insertDocument = new ValidatedMethod({
  name: 'documents.insert2',
  validate: new SimpleSchema({
    title: { type: String },
    body: { type: String },
  }).validator(),
  run(document) {
    if (!this.userId) {
      throw new Meteor.Error('documents.upsert.notLoggedIn',
        'Must be logged in to insertor update a document');
    }

    return Documents.insert({
      ...document,
      owner: this.userId,
      createdAt: new Date(),
    });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error('documents.remove.notLoggedIn',
        'Must be logged in to remove a document.');
    }

    const document = Documents.findOne(_id);

    if (document.owner !== this.userId) {
      throw new Meteor.Error('documents.remove.accessDenied',
        'You don\'t have permission to remove this document.');
    }

    try {
      return Documents.remove(_id);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    insertDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});
