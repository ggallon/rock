/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import Quotes from './quotes';

describe('API Quotes collection', function () {
  beforeEach(() => {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Quotes, 'object');
  });

  it('builds correctly from factory', function () {
    const quote = Factory.create('quote', { ownerId: Random.id() });

    assert.typeOf(quote, 'object');
    assert.equal(quote.title, 'Title');
    assert.equal(quote.body, 'Contenu');
    assert.typeOf(quote.ownerId, 'string');
    assert.typeOf(quote.createdAt, 'string');
  });
});
