/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

describe('UI - 404 Error', function () {
  it('should render a 404 for a non-existent route @watch', function () {
    browser.url('http://localhost:3000/dididothat')
           .waitForExist('.alert-danger');

    expect(browser.getText('.alert-danger p')).to.equal("[404] Erreur : /dididothat n\'existe pas.");
  });
});
