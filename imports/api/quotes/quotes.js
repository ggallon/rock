import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';
import '/imports/lib/simple_schema_message_box_fr';

const Quotes = new Mongo.Collection('Quotes');
export default Quotes;

Quotes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Quotes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Quotes.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  title: {
    type: String,
    label: 'The title of the quote.',
  },
  body: {
    type: String,
    label: 'The body of the quote.',
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

Quotes.attachSchema(Quotes.schema);

Meteor.startup(() => {
  if (Meteor.isServer) {
    Quotes._ensureIndex({ ownerId: 1 });
    Quotes._ensureIndex({ createdAt: -1 });
    Quotes._ensureIndex({ updatedAt: -1 });
  }
});

Factory.define('quote', Quotes, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
});
