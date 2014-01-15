rewire = require 'rewire'
sinon = require 'sinon'
redirectMobile = rewire '../../../lib/middleware/redirect_mobile'

describe 'Redirect mobile middleware', ->

  beforeEach ->
    redirectMobile.__set__ 'MOBILE_URL', 'm.foobart.sy'
    @req = { params: {}, logout: sinon.stub() }
    @res = { redirect: sinon.stub() }

  it 'redirects mobile user agents', ->
    @req.get = -> 'Mobile Android'
    redirectMobile @req, @res
    @res.redirect.args[0][0].should.include 'm.foobart.sy'

  it 'does not redirect desktop user agents', ->
    @req.get = -> 'Chome'
    redirectMobile @req, @res, ->
    @res.redirect.called.should.not.be.ok

  it 'respects stop_microgravity_redirect param', ->
    @req.get = -> 'Mobile Android'
    @req.query = stop_microgravity_redirect: true
    redirectMobile @req, @res, ->
    @res.redirect.called.should.not.be.ok
