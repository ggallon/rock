import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import rateLimit from '/imports/lib/rate-limit';

export const insertUser = new ValidatedMethod({
  name: 'users.insert',
  validate: new SimpleSchema({
    givenName: { type: String },
    familyName: { type: String },
    identifiant: { type: String, regEx: SimpleSchema.RegEx.EmailWithTLD, optional: true },
    password: { type: String },
  }).validator(),
  run(user) {
    if (!this.userId) {
      throw new Meteor.Error('users.insert.notLoggedIn',
        'Must be logged in to insert an user');
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
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    givenName: { type: String, optional: true },
    familyName: { type: String, optional: true },
    identifiant: { type: String, regEx: SimpleSchema.RegEx.EmailWithTLD, optional: true },
  }).validator(),
  run(user) {
    if (!this.userId) {
      throw new Meteor.Error('users.update.notLoggedIn',
        'Must be logged in to insert update an user');
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
    insertUser,
    updateUser,
  ],
  limit: 5,
  timeRange: 1000,
});
