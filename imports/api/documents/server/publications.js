import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../documents';

Meteor.publish('documents.list', function documentsListPublish() {
  if (!this.userId) {
    return this.ready();
  }

  return Documents.find({}, {
    fields: {
      title: 1,
      body: 1,
    },
    sort: { createdAt: -1 },
  });
});

Meteor.publish('documents.view', function documentsViewPublish(documentId) {
  if (!this.userId) {
    return this.ready();
  }

  check(documentId, String);

  return Documents.find({ _id: documentId }, {
    fields: {
      title: 1,
      body: 1,
      owner: 1,
    },
  });
});
