import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import rateLimit from '../../../lib/rate-limit';
import userSchema from '../userSchema';

export const insertUser = new ValidatedMethod({
  name: 'users.insert',
  validate: userSchema.pick('givenName', 'familyName', 'identifiant', 'password').validator(),
  run(user) {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.insert.notLoggedIn',
        'Must be logged in to insert an user',
      );
    }

    const userData = {
      email: user.identifiant,
      password: user.password,
      profile: {
        givenName: user.givenName,
        familyName: user.familyName,
      },
    };

    return Accounts.createUser(userData);
  },
});

export const updateUser = new ValidatedMethod({
  name: 'users.update',
  validate: userSchema.pick('_id', 'givenName', 'familyName', 'identifiant').validator(),
  run(user) {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.update.notLoggedIn',
        'Must be logged in to insert update an user',
      );
    }

    if (user._id !== this.userId) {
      throw new Meteor.Error(
        'users.update.accessDenied',
        'You don\'t have permission to update this user.',
      );
    }

    try {
      const userId = user._id;
      Meteor.users.update({ _id: user._id }, {
        $set: {
          profile: {
            givenName: user.givenName,
            familyName: user.familyName,
          },
        },
      });
      return userId; // Return _id so we can redirect to user after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'users.insert',
    'users.update',
  ],
  limit: 5,
  timeRange: 1000,
});
