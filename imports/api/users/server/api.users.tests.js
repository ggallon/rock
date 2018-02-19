/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import { insertUser, updateUser } from './methods';
import Users from '../collection';
import userSchema from '../userSchema';


describe('API Users methods', () => {
  beforeEach(() => {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });
  
  it('only works if you are logged in', () => {
    // Set up method context and arguments
    const context = { };
    const insertArgs = Factory.tree('user', {
      password: 'password'
    });
    const updateAgrs = Factory.build('user', {
      identifiant: 'update@update.com',
    });

    assert.throws(() => {
      insertUser._execute(context, insertArgs);
    }, Meteor.Error, /users.insert.notLoggedIn/);

    assert.throws(() => {
      updateUser._execute(context, updateAgrs);
    }, Meteor.Error, /users.update.notLoggedIn/);
  });
  
  it('insert a user into the Users collection', () => {

  });

  it('update a user in the Users collection', () => {

  });
});
