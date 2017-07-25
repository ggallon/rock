import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Invitations = new Mongo.Collection('Invitations');
export default Invitations;

Invitations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Invitations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Invitations.schema = new SimpleSchema({
  emailAddress: {
    type: String,
    label: 'The email address of the user being invited.',
  },
  role: {
    type: String,
    label: 'The role of the user being invited.',
  },
  sent: {
    type: String,
    label: 'When was this invitation sent?',
    autoValue() {
      return (new Date()).toISOString();
    },
  },
});

Invitations.attachSchema(Invitations.schema);
