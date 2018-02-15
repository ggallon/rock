/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { removeUser } from './helpers.js'

describe('APP - Sign Up', function () {
  beforeEach(() => removeUser());
  beforeEach(() => removeUser());

  it('go to sign Up @watch', function () {
    browser.url('http://localhost:3000/signup')
           .waitForExist('.Signup');

    expect(browser.getUrl()).to.equal('http://localhost:3000/signup');
  });

  it('should create a new user and login with redirect to index @watch', function () {
    browser.url('http://localhost:3000/signup')
           .waitForExist('.Signup');
    browser.setValue('[name="givenName"]', 'Gwenaël')
           .setValue('[name="familyName"]', 'Gallon')
           .setValue('[name="identifiant"]', 'admin@admin.com')
           .setValue('[name="password"]', 'password')
           .setValue('[name="repeatPassword"]', 'password')
           .click('[type="submit"]');

    browser.waitForExist('.Index');
    expect(browser.getUrl()).to.equal('http://localhost:3000/');
  });
});
