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
  let userIdGlobal;
  let context;

  userIdGlobal = Random.id();
  context = { userId: userIdGlobal };

  Factory.define('quote', Quotes, {
    title: () => 'Title',
    body: () => 'Contenu',
  });

  const createQuote = (props = {}) => {
    return Factory.create('quote', props);
  };

  beforeEach(function () {
    resetDatabase();
  });

  describe('Collection', function () {
    it('registers the collection with Mongo properly', function () {
      assert.equal(typeof Quotes, 'object');
    });

    it('builds correctly from factory', function () {
      const quote = createQuote({ ownerId: Random.id() });

      assert.typeOf(quote, 'object');
      assert.equal(quote.title, 'Title');
      assert.equal(quote.body, 'Contenu');
      assert.typeOf(quote.ownerId, 'string');
      assert.typeOf(quote.createdAt, 'string');
    });
  });
  
  describe('Publication', function () {
    beforeEach(function () {
      createQuote({ ownerId: Random.id() });
      createQuote({ ownerId: Random.id() });
      createQuote({ ownerId: Random.id() });
    });

    it('should pass the correct context to the publication', function(done) {
      // Insert quote before
      const quote = createQuote({ ownerId: Random.id() });

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
      newInsertQuote = createQuote({ ownerId: userIdGlobal });
    });

    it('insert, update and remove only works if you are logged in', function () {
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

    it('update and remove only works if you are logged in and the owner', function () {
      // Set up method context and arguments
      const contextDiffUser = { userId: Random.id() };
      const args = Factory.build('quote', {
        _id: newInsertQuote._id,
        title: 'Title update',
        ownerId: userIdGlobal,
        createdAt: newInsertQuote.createdAt,
      });

      assert.throws(function () {
        updateQuote._execute(contextDiffUser, args);
      }, Meteor.Error, /quotes.update.accessDenied/);
      
       assert.throws(function () {
        removeQuote._execute(contextDiffUser, { _id: args._id });
      }, Meteor.Error, /quotes.remove.accessDenied/);
    });

    it('insert a quote', function () {
      // Set up method arguments
      const args = newTreeQuote;

      const quoteId = insertQuote._execute(context, args);
      const getQuote = Quotes.findOne(quoteId);
      
      assert.equal(getQuote.title, 'Title');
      assert.equal(getQuote.body, 'Contenu');
      assert.equal(getQuote.ownerId, userIdGlobal);
      assert.typeOf(getQuote.createdAt, 'string');
    });

    it('update a quote', function () {
      // Set up method arguments
      const args = Factory.build('quote', {
        _id: newInsertQuote._id,
        title: 'Title update',
        ownerId: userIdGlobal,
        createdAt: newInsertQuote.createdAt
      });

      const resultId = updateQuote._execute(context, args);
      const getQuote = Quotes.findOne(resultId);
      
      assert.equal(getQuote.title, 'Title update');
      assert.typeOf(getQuote.updatedAt, 'string');
    });

    it('remove a quote', function () {
      // Set up method arguments
      const args = { _id: newInsertQuote._id };

      const result = removeQuote._execute(context, args);
      const getQuote = Quotes.findOne(newInsertQuote._id);

      assert.equal(getQuote, undefined);
    });
  });
});
