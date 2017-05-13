import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Accounts.onCreateUser((options, user) => {
  const profile = options.profile;
  const newUser = user;

  if (profile) {
    newUser.name = { first: profile.name.first, last: profile.name.last };
  }

  if (options.email !== 'admin@admin.com') {
    newUser.roles = ['registered', Roles.GLOBAL_GROUP];
  }

  return newUser;
});
