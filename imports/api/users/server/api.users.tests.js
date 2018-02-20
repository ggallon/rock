/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import { insertUser, updateUser } from './methods';
import Users from '../collection';

describe('API Users', function () {
  let context;

  before(function () {
    context = { userId: Random.id() };

    Factory.define('user', Users, {
      givenName: () => 'Given name',
      familyName: () => 'Family name',
      identifiant: () => 'user@user.com',
    });

    Factory.define('userWithPassword', Users, Factory.extend('user', {
       password: 'password'
    }));
  });

  beforeEach(function () {
    resetDatabase();
  });

  describe('Collection', function () {
    it('registers the collection with Mongo properly', function () {
      assert.equal(typeof Users, 'object');
    });

    it('builds correctly from factory', function () {
      const user = Factory.build('userWithPassword');

      assert.typeOf(user, 'object');
      assert.equal(user.givenName, 'Given name');
      assert.equal(user.familyName, 'Family name');
      assert.equal(user.identifiant, 'user@user.com');
      assert.equal(user.password, 'password');
    });
  });

  describe('Methods', function () {
    let userWithPassword;
    let userWithoutPassword;

    before(function () {
      userWithPassword = Factory.tree('userWithPassword')
      userWithoutPassword = Factory.build('user');
    });

    it('insert and Update only works if you are logged in', () => {
      assert.throws(() => {
        insertUser._execute({}, userWithPassword);
      }, Meteor.Error, /users.insert.notLoggedIn/);

      assert.throws(() => {
        updateUser._execute({}, userWithoutPassword);
      }, Meteor.Error, /users.update.notLoggedIn/);
    });

    it('update only works if you are logged in and the owner', function () {
      assert.throws(function () {
        updateUser._execute(context, userWithoutPassword);
      }, Meteor.Error, /users.update.accessDenied/);
    });

    it('insert an user', function () {
      const userId = insertUser._execute(context, userWithPassword);
      const getUser = Meteor.users.findOne(userId);
      
      assert.equal(getUser.emails[0].address, 'user@user.com');
      assert.equal(getUser.emails[0].verified, false);
      assert.equal(getUser.profile.givenName, 'Given name');
      assert.equal(getUser.profile.familyName, 'Family name');
      assert.typeOf(getUser.services.password.bcrypt, 'string');
      assert.typeOf(getUser.createdAt, 'date');
    });

    it('update an user', () => {
      const userInsertId = insertUser._execute(context, userWithPassword);

      const userUpdate = Factory.build('user', {
        _id: userInsertId,
        givenName: 'Given name update'
      });

      const result = updateUser._execute({ userId: userInsertId }, userUpdate);
      const getUserUpdated = Meteor.users.findOne(userInsertId);

      assert.equal(getUserUpdated.profile.givenName, 'Given name update');
    });
  });
});
