/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { createUser, removeUser } from './helpers.js'

describe('APP - Log In', () => {
  beforeEach(() => removeUser());
  beforeEach(() => removeUser());

  it('redirect to login @watch', () => {
    browser.url('http://localhost:3000')
           .waitForExist('.Login');

    expect(browser.getUrl()).to.equal('http://localhost:3000/login');
  });

  it('should allow us to login @watch', () => {
    createUser();

    browser.url('http://localhost:3000')
           .waitForExist('.Login');
    browser.setValue('[name="identifiant"]', 'admin@admin.com')
           .setValue('[name="password"]', 'password')
           .click('[type="submit"]');

    browser.waitForExist('.Index');
    expect(browser.getUrl()).to.equal('http://localhost:3000/');
  });
});
