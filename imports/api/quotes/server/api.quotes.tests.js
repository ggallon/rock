/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import Quotes from '../quotes';
import { insertQuote, updateQuote, removeQuote } from '../methods';
import './publications';

describe('API Quotes', function () {
  let context;

  before(function () {
    context = { userId: Random.id() };

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
  });
  
  describe('Publication', function () {
    beforeEach(function () {
      Factory.create('quote', { ownerId: Random.id() });
      Factory.create('quote', { ownerId: Random.id() });
      Factory.create('quote', { ownerId: Random.id() });
    });

    it('should pass the correct context to the publication', function(done) {
      // Insert quote before
      const quote = Factory.create('quote', {
        ownerId: Random.id()
      })

      const collectorList = new PublicationCollector(context);
      const collectortView = new PublicationCollector(context);

      collectorList.collect('quotes.list', collections => {
        try {
          assert.ok(collections.Quotes);
          assert.typeOf(collections.Quotes, 'array');
          assert.equal(collections.Quotes.length, 4, 'collects 4 Quotes');
        } catch (err) {
          done(err);
        }
      });

      collectortView.collect('quotes.view', quote._id, collections => {
        try {
          assert.ok(collections.Quotes);
          assert.typeOf(collections.Quotes, 'array');
          assert.equal(collections.Quotes.length, 1, 'collects 1 Quote');
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe('Methods', function () {
    let newTreeQuote;
    let newInsertQuote;

    before(function () {
      newTreeQuote = Factory.tree('quote')
    });

    beforeEach(function () {
      newInsertQuote = Factory.create('quote', {
        ownerId: Random.id()
      });
    });

    it('Insert, Update and Remove only works if you are logged in', function () {
      assert.throws(function () {
        insertQuote._execute({}, newTreeQuote);
      }, Meteor.Error, /quotes.insert.notLoggedIn/);

      assert.throws(function () {
        updateQuote._execute({}, newInsertQuote);
      }, Meteor.Error, /quotes.update.notLoggedIn/);
      
       assert.throws(function () {
        removeQuote._execute({}, { _id: newInsertQuote._id });
      }, Meteor.Error, /quotes.remove.notLoggedIn/);
    });

    it('Update and Remove only works if you are logged in and the owner', function () {
      // Set up method arguments
      const updateAgrs = Factory.build('quote', {
        _id: newInsertQuote._id,
        title: 'Title update',
        ownerId: Random.id(),
        createdAt: newInsertQuote.createdAt,
      });

      assert.throws(function () {
        updateQuote._execute(context, updateAgrs);
      }, Meteor.Error, /quotes.update.accessDenied/);
      
       assert.throws(function () {
        removeQuote._execute(context, { _id: newInsertQuote._id });
      }, Meteor.Error, /quotes.remove.accessDenied/);
    });

    it('insert a quote', function () {
      const quoteId = insertQuote._execute(context, newTreeQuote);
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
      const contextUpdate = { userId: newInsertQuote.ownerId };
      const args = Factory.build('quote', {
        _id: newInsertQuote._id,
        title: 'Title update',
        ownerId: newInsertQuote.ownerId,
        createdAt: newInsertQuote.createdAt
      });

      const resultId = updateQuote._execute(contextUpdate, args);
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
      const contextRemove = { userId: quote.ownerId };
      const args = { _id: quote._id };

      const result = removeQuote._execute(contextRemove, args);
      const getQuote = Quotes.findOne(quote._id);

      assert.equal(getQuote, undefined);
    });
  });
});
