import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '/imports/api/documents/documents';

Meteor.publish('documents.list', function documentsListPublish() {
  if (!this.userId) {
    return this.ready();
  }

  return Documents.find({}, {
    fields: {
      title: 1,
      body: 1,
    },
  });
});

Meteor.publish('documents.view', function documentsViewPublish(id) {
  if (!this.userId) {
    return this.ready();
  }

  check(id, String);

  return Documents.find({ _id: id }, {
    fields: {
      title: 1,
      body: 1,
    },
  });
});
