import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

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

Meteor.publish('users.view', function usersViewPublish(userId) {
  if (!this.userId) {
    return this.ready();
  }

  check(userId, String);

  return Meteor.users.find({ _id: userId }, {
    fields: {
      emails: 1,
      profile: 1,
    },
  });
});

Meteor.publish('users.list', function usersListPublish() {
  if (!this.userId) {
    return this.ready();
  }

  return [
    Meteor.users.find({}, { fields: { emails: 1, roles: 1 } }),
    Roles.getAllRoles(),
  ];
});

Meteor.publish('users.roles', function usersRolesPublish() {
  if (!this.userId) {
    return this.ready();
  }

  return Roles.getAllRoles();
});
