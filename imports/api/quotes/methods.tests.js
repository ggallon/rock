/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import Quotes from './quotes';
import { insertQuote, updateQuote, removeQuote } from './methods';

describe('API Quotes methods', () => {
  beforeEach(() => {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });
  
  it('only works if you are logged in', () => {
    // Set up method context and arguments
    const context = { };
    const insertArgs = Factory.tree('quote');
    const updateAgrs = Factory.build('quote', {
      ownerId: Random.id(),
      createdAt: (new Date()).toISOString(),
    });
    const removeArgs = { _id: updateAgrs._id };

    assert.throws(() => {
      insertQuote._execute(context, insertArgs);
    }, Meteor.Error, /quotes.insert.notLoggedIn/);

    assert.throws(() => {
      updateQuote._execute(context, updateAgrs);
    }, Meteor.Error, /quotes.update.notLoggedIn/);
    
     assert.throws(() => {
      removeQuote._execute(context, removeArgs);
    }, Meteor.Error, /quotes.remove.notLoggedIn/);
  });

  it('insert a quote into the Quotes collection', () => {
    // Set up method context and arguments
    const context = { userId: Random.id() };
    const args = Factory.tree('quote');

    const quoteId = insertQuote._execute(context, args);
    const getQuote = Quotes.findOne(quoteId);
    
    assert.equal(getQuote.title, 'Title');
    assert.equal(getQuote.body, 'Contenu');
    assert.equal(getQuote.ownerId, context.userId);
    // autoValues are added only on the server 
    if (Meteor.isServer) {
      assert.typeOf(getQuote.createdAt, 'string');
    }
  });

  it('update a quote in the Quotes collection', () => {
    // Insert quote for update
    const quote = Factory.create('quote', { ownerId: Random.id() });
    // Set up method context and arguments
    const context = { userId: quote.ownerId };
    const args = Factory.build('quote', {
      _id: quote._id,
      title: 'Title update',
      ownerId: quote.ownerId,
      createdAt: (new Date()).toISOString()
    });

    const resultId = updateQuote._execute(context, args);
    const getQuote = Quotes.findOne(resultId);
    
    assert.equal(getQuote.title, 'Title update');
    // autoValues are added only on the server 
    if (Meteor.isServer) {
      assert.typeOf(getQuote.updatedAt, 'string');
    }
  });

  it('remove a quote from the Quotes collection', () => {
    // Insert quote for update
    const quote = Factory.create('quote', { ownerId: Random.id() });
    // Set up method context and arguments
    const context = { userId: quote.ownerId };
    const args = { _id: quote._id };

    const result = removeQuote._execute(context, args);
    const getQuote = Quotes.findOne(quote._id);

    assert.equal(getQuote, undefined);
  });
});
