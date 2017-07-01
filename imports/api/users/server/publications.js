import { Meteor } from 'meteor/meteor';

Meteor.publish('users.info', function userInfoPublish() {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find(this.userId, {
    fields: {
      emails: 1,
      profile: 1,
      services: 1,
    },
  });
});
