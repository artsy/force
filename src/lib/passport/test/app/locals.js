const sinon = require('sinon');
const locals = require('../../lib/app/locals');

describe('locals', function() {

  let req;
  let res;
  let next;

  beforeEach(function() {
    req = { query: {} };
    res = { locals: { sd: {} } };
    next = sinon.stub();
  });

  it('escapes the error message html', function() {
    req.query.error = '<img src=alert(hello) />';
    locals(req, res, next);
    res.locals.error.should.equal('&lt;img src=alert(hello) /&gt;');
  });

  it('sets the user if logged in');

  it('sets csrf to sharify');

  it('sets the query param error for login & signup pages');

  it('provides the artsy passport options');
});
