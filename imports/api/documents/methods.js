import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import rateLimit from '../../lib/rate-limit';
import Documents from './documents';

export const insertDocument = new ValidatedMethod({
  name: 'documents.insert',
  validate: new SimpleSchema({
    title: { type: String },
    body: { type: String },
  }).validator(),
  run(document) {
    if (!this.userId) {
      throw new Meteor.Error('documents.insert.notLoggedIn',
        'Must be logged in to insertor update a document');
    }

    return Documents.insert({
      ...document,
      owner: this.userId,
    });
  },
});

export const updateDocument = new ValidatedMethod({
  name: 'documents.update',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run(document) {
    if (!this.userId) {
      throw new Meteor.Error('documents.update.notLoggedIn',
        'Must be logged in to insertor update a document');
    }

    if (document._id && document.owner !== this.userId) {
      throw new Meteor.Error('documents.update.accessDenied',
        'You don\'t have permission to update this document.');
    }

    try {
      const documentId = document._id;
      Documents.update({ _id: document._id }, { $set: document });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
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
    updateDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});
