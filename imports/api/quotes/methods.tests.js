/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import Quotes from './quotes.js';
import { upsertQuote, removeQuote } from './methods.js';

describe('Quotes methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a quote into the Quotes collection', function () {
    upsertQuote.call({
      title: 'You can\'t arrest me, I\'m the Cake Boss!',
      body: 'They went nuts!',
    });

    const getQuote = Quotes.findOne({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    assert.equal(getQuote.body, 'They went nuts!');
  });

  it('updates a quote in the Quotes collection', function () {
    const { _id } = Factory.create('quote');

    upsertQuote.call({
      _id,
      title: 'You can\'t arrest me, I\'m the Cake Boss!',
      body: 'They went nuts!',
    });

    const getQuote = Quotes.findOne(_id);
    assert.equal(getQuote.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('removes a quote from the Quotes collection', function () {
    const { _id } = Factory.create('quote');
    removeQuote.call({ _id });
    const getQuote = Quotes.findOne(_id);
    assert.equal(getQuote, undefined);
  });
});
