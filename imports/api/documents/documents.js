import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';
import '/imports/lib/simple_schema_message_box_fr';

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
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  createdAt: {
    type: String,
    autoValue() {
      if (this.isInsert) {
        return (new Date()).toISOString();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: (new Date()).toISOString(),
        };
      }
    },
  },
  updatedAt: {
    type: String,
    autoValue() {
      if (this.isUpdate) {
        return {
          $set: (new Date()).toISOString(),
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
    Documents._ensureIndex({ ownerId: 1 });
    Documents._ensureIndex({ createdAt: -1 });
    Documents._ensureIndex({ updatedAt: -1 });
  }
});

Factory.define('document', Documents, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
});
