import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Invitations from '../invitations';

Meteor.publish('invitations.list', function invitationsListPublish() {
  if (!this.userId) {
    return this.ready();
  }

  return Invitations.find();
});

Meteor.publish('invitations.accept', function invitationsAcceptPublish(invitationId) {
  check(invitationId, String);
  return Invitations.find(invitationId);
});
