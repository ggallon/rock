/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { createUser, removeUser } from './helpers.js'

describe('APP - Recover password', () => {
  beforeEach(() => removeUser());
  beforeEach(() => removeUser());

  it('go to recover password @watch', () => {
    browser.url('http://localhost:3000/recover-password')
           .waitForExist('.recoverPassword');

    expect(browser.getUrl()).to.equal('http://localhost:3000/recover-password');
  });

  it('should allow us to recover password @watch', () => {
    createUser();

    browser.url('http://localhost:3000/recover-password')
           .waitForExist('.recoverPassword');
    browser.setValue('[name="identifiant"]', 'admin@admin.com')
           .click('[type="submit"]');

    browser.waitForExist('.alert-success');
    expect(browser.getUrl()).to.equal('http://localhost:3000/recover-password');
  });
});
