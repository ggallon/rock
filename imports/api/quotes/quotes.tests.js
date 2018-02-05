/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'chai';
import Quotes from './quotes';

describe('Quotes collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Quotes, 'object');
  });
});
