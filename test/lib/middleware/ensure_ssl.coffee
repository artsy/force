rewire = require 'rewire'
sinon = require 'sinon'
ensureSSL = rewire '../../../lib/middleware/ensure_ssl'

describe 'Ensure SSL middleware', ->

  beforeEach ->
    ensureSSL.__set__ 'APP_URL', 'https://foobart.sy'
    @req = { params: {}, logout: sinon.stub(), url: '/terms' }
    @res = { redirect: sinon.stub() }

  it 'redirects Heroku http requests to https', ->
    @req.get = -> 'http:'
    ensureSSL @req, @res
    @res.redirect.args[0].should.eql [301, 'https://foobart.sy/terms']

  it 'redirects normal http requests to https', ->
    @req.get = -> ''
    @req.protocol = 'http:'
    ensureSSL @req, @res, ->
    @res.redirect.args[0].should.eql [301, 'https://foobart.sy/terms']

  it 'does not redirect https to https causing an infinite loop', ->
    @req.get = -> 'https'
    ensureSSL @req, @res, next = sinon.stub()
    next.called.should.be.ok()
