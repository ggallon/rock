import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import rateLimit from '/imports/lib/rate-limit';
import Documents from './documents';

export const upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
  }).validator(),
  run(document) {
    if (!this.userId) {
      throw new Meteor.Error('documents.upsert.notLoggedIn',
        'Must be logged in to upsert documents.');
    }

    const data = document;
    data.createdAt = new Date();
    data.userId = this.userId;

    return Documents.upsert({ _id: document._id }, { $set: data });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error('documents.remove.notLoggedIn',
        'Must be logged in to remove documents.');
    }

    const document = Documents.findOne(_id);

    if (!document.userId === this.userId) {
      throw new Meteor.Error('documents.remove.accessDenied',
        'You don\'t have permission to remove this document.');
    }

    Documents.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});
