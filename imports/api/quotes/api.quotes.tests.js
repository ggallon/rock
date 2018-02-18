/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import Quotes from './quotes';
import { insertQuote, updateQuote, removeQuote } from './methods';

describe('API Quotes', function () {
  before(function () {
    Factory.define('quote', Quotes, {
      title: () => 'Title',
      body: () => 'Contenu',
    });
  });
  beforeEach(function () {
    resetDatabase();
  });

  describe('Collection', function () {
    it('registers the collection with Mongo properly', function () {
      assert.equal(typeof Quotes, 'object');
    });

    if (Meteor.isServer) {
      it('builds correctly from factory', function () {
        const quote = Factory.create('quote', {
          ownerId: Random.id()
        });

        assert.typeOf(quote, 'object');
        assert.equal(quote.title, 'Title');
        assert.equal(quote.body, 'Contenu');
        assert.typeOf(quote.ownerId, 'string');
        assert.typeOf(quote.createdAt, 'string');
      });
    }
  });

  if (Meteor.isServer) {
    describe('Methods', function () {
      it('Insert, Update and Remove only works if you are logged in', function () {
        // Set up method context and arguments
        const context = { };
        const insertArgs = Factory.tree('quote');
        const updateAgrs = Factory.build('quote', {
          ownerId: Random.id(),
          createdAt: (new Date()).toISOString(),
        });
        const removeArgs = { _id: updateAgrs._id };

        assert.throws(function () {
          insertQuote._execute(context, insertArgs);
        }, Meteor.Error, /quotes.insert.notLoggedIn/);

        assert.throws(function () {
          updateQuote._execute(context, updateAgrs);
        }, Meteor.Error, /quotes.update.notLoggedIn/);
        
         assert.throws(function () {
          removeQuote._execute(context, removeArgs);
        }, Meteor.Error, /quotes.remove.notLoggedIn/);
      });

      it('Update and Remove only works if you are logged in and the owner', function () {
        // Insert quote before
        const quote = Factory.create('quote', {
          ownerId: Random.id()
        });
        // Set up method context and arguments
        const context = { userId: Random.id() };
        const updateAgrs = Factory.build('quote', {
          _id: quote._id,
          title: 'Title update',
          ownerId: Random.id(),
          createdAt: quote.createdAt,
        });
        const removeArgs = { _id: quote._id };

        assert.throws(function () {
          updateQuote._execute(context, updateAgrs);
        }, Meteor.Error, /quotes.update.accessDenied/);
        
         assert.throws(function () {
          removeQuote._execute(context, removeArgs);
        }, Meteor.Error, /quotes.remove.accessDenied/);
      });

      it('insert a quote', function () {
        // Set up method context and arguments
        const context = { userId: Random.id() };
        const args = Factory.tree('quote');

        const quoteId = insertQuote._execute(context, args);
        const getQuote = Quotes.findOne(quoteId);
        
        assert.equal(getQuote.title, 'Title');
        assert.equal(getQuote.body, 'Contenu');
        assert.equal(getQuote.ownerId, context.userId);
        assert.typeOf(getQuote.createdAt, 'string');
      });

      it('update a quote', function () {
        // Insert quote before
        const quote = Factory.create('quote', {
          ownerId: Random.id()
        });
        // Set up method context and arguments
        const context = { userId: quote.ownerId };
        const args = Factory.build('quote', {
          _id: quote._id,
          title: 'Title update',
          ownerId: quote.ownerId,
          createdAt: quote.createdAt
        });

        const resultId = updateQuote._execute(context, args);
        const getQuote = Quotes.findOne(resultId);
        
        assert.equal(getQuote.title, 'Title update');
        assert.typeOf(getQuote.updatedAt, 'string');
      });

      it('remove a quote', function () {
        // Insert quote before
        const quote = Factory.create('quote', {
          ownerId: Random.id()
        });
        // Set up method context and arguments
        const context = { userId: quote.ownerId };
        const args = { _id: quote._id };

        const result = removeQuote._execute(context, args);
        const getQuote = Quotes.findOne(quote._id);

        assert.equal(getQuote, undefined);
      });
    });
  }
});

