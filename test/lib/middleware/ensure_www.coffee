_ = require 'underscore'
rewire = require 'rewire'
sinon = require 'sinon'
robots = rewire '../../../lib/middleware/ensure_www'

describe 'ensure www middleware', ->

  beforeEach ->
    robots.__set__ 'APP_URL', 'https://www.artsy.net'
    @req = { url: '/artist/andy-warhol?foo=bar' }
    @res = redirect: sinon.stub(), clearCookie: sinon.stub()
    @next = sinon.stub()

  it 'redirects to www if thats the app url', ->
    @req.get = -> 'artsy.net'
    robots @req, @res, @next
    @res.redirect.args[0][0].should.equal 301
    @res.redirect.args[0][1]
      .should.equal 'https://www.artsy.net/artist/andy-warhol?foo=bar'

  it 'doesnt care if the url is the same', ->
    robots.__set__ 'APP_URL', 'https://artsy.net'
    robots @req, @res, @next
    @res.redirect.called.should.not.be.ok()
    @next.called.should.be.ok()