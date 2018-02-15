import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';
import '../../lib/simple_schema_message_box_fr';

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
    label: 'Titre',
    type: String,
    uniforms: {
      type: 'text',
      placeholder: 'Titre',
    }
  },
  body: {
    label: 'Contenu',
    type: String,
    uniforms: {
      type: 'text',
      placeholder: 'Contenu',
    }
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
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
  title: () => 'Title',
  body: () => 'Contenu',
});
