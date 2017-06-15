/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

describe('Log In', function () {
  beforeEach(function () {
    server.execute(function () {
      const { Meteor } = require('meteor/meteor');
      const user = Meteor.users.findOne({ 'emails.address': 'admin@admin.com' });
      if (user) {
        Meteor.users.remove(user._id);
      }
    });
  });

  it('should allow us to login @watch', function () {
    server.execute(function () {
      const { Accounts } = require('meteor/accounts-base');

      Accounts.createUser({
        email: 'admin@admin.com',
        password: 'password',
        profile: {
          name: { first: 'Gwenaël', last: 'Gallon' },
        },
      });
    });

    browser.url('http://localhost:3000/login')
           .setValue('[name="identifiant"]', 'admin@admin.com')
           .setValue('[name="password"]', 'password')
           .submitForm('form');

    browser.waitForExist('.jumbotron');
    expect(browser.getUrl()).to.equal('http://localhost:3000/');
  });
});
