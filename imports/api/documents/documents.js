import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Documents = new Mongo.Collection('Documents');
export default Documents;

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Documents.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: (new Date()).toISOString(),
        };
      }
    },
  },
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) {
        return {
          $set: new Date(),
        };
      } else if (this.isUpsert) {
        return {
          $setOnInsert: (new Date()).toISOString(),
        };
      }
    },
    optional: true,
  },
});

Documents.attachSchema(Documents.schema);

Meteor.startup(() => {
  if (Meteor.isServer) {
    Documents._ensureIndex({ owner: 1 });
    Documents._ensureIndex({ createdAt: -1 });
    Documents._ensureIndex({ updatedAt: -1 });
  }
});

Factory.define('document', Documents, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
});
