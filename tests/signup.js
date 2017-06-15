/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

describe('Sign Up', function () {
  beforeEach(function () {
    server.execute(function () {
      const { Meteor } = require('meteor/meteor');
      const user = Meteor.users.findOne({ 'emails.address': 'admin@admin.com' });
      if (user) {
        Meteor.users.remove(user._id);
      }
    });
  });

  it('should create a new user and login with redirect to index @watch', function () {
    browser.url('http://localhost:3000/signup')
           .setValue('[name="firstName"]', 'Gwenaël')
           .setValue('[name="lastName"]', 'Gallon')
           .setValue('[name="identifiant"]', 'admin@admin.com')
           .setValue('[name="password"]', 'password')
           .setValue('[name="repeatPassword"]', 'password')
           .submitForm('form');

    browser.waitForExist('.jumbotron');
    expect(browser.getUrl()).to.equal('http://localhost:3000/');
  });
});
