/* Helpers */

export const createUser = () => {
  server.execute(() => {
    const { Accounts } = require('meteor/accounts-base');

    Accounts.createUser({
      email: 'admin@admin.com',
      password: 'password',
      profile: {
        givenName: 'Gwenaël',
        familyName: 'Gallon'
      }
    });
  });
};

export const removeUser = () => {
  server.execute(() => {
    const { Meteor } = require('meteor/meteor');
    const user = Meteor.users.findOne({ 'emails.address': 'admin@admin.com' });
    if (user) {
      Meteor.users.remove(user._id);
    }
  });
};
