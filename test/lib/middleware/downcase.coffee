sinon = require 'sinon'
downcase = require '../../../lib/middleware/downcase'

describe 'downcase middleware', ->
  beforeEach ->
    @req = _parsedUrl: search: null
    @res = redirect: sinon.stub()
    @next = sinon.stub()

  it 'should not redirect lowercase paths', ->
    @req._parsedUrl.pathname = '/foo/bar'
    downcase @req, @res, @next

    @res.redirect.called.should.be.false()
    @next.called.should.be.true()

  it 'should redirect paths with uppercase letters', ->
    @req._parsedUrl.pathname = '/Foo/Bar'
    downcase @req, @res, @next

    @res.redirect.called.should.be.true()
    @next.called.should.be.false()
    @res.redirect.args[0].should.eql [301, '/foo/bar']

  it 'should not lowercase the query string', ->
    @req._parsedUrl.search = '?Bar=Baz'
    @req._parsedUrl.pathname = '/Foo'
    downcase @req, @res, @next

    @res.redirect.called.should.be.true()
    @next.called.should.be.false()
    @res.redirect.args[0].should.eql [301, '/foo?Bar=Baz']
