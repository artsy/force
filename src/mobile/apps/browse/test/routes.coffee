routes = require '../routes'
sinon = require 'sinon'

describe 'routes #to', ->
  beforeEach ->
    @req = url: 'http://artsy.net/foo/bar'
    @res = redirect: sinon.stub()

  it 'redirects to a url', ->
    routes.to('baz') @req, @res, @next
    @res.redirect.args[0][0].should.equal 301
    @res.redirect.args[0][1].should.equal 'baz'
