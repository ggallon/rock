import { Meteor } from 'meteor/meteor';

const Users = Meteor.users;
export default Users;

Factory.define('user', Users, {
  givenName: () => 'Given name',
  familyName: () => 'Family name',
  identifiant: () => 'user@user.com',
});
