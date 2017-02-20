rewire = require 'rewire'
sinon = require 'sinon'
redirectMobile = rewire '../../../lib/middleware/redirect_mobile'

describe 'Redirect mobile middleware', ->

  beforeEach ->
    redirectMobile.__set__ 'MOBILE_URL', 'm.foobart.sy'
    @redirect = redirectMobile.__get__ 'redirect'
    @req = { params: {}, logout: sinon.stub(), get: sinon.stub() }
    @res = { redirect: sinon.stub(), locals: sd: {} }

  it 'redirects mobile user agents', ->
    @req.get = -> 'Mobile Android'
    @redirect @req, @res
    @res.redirect.args[0][0].should.containEql 'm.foobart.sy'

  it 'does not redirect desktop user agents', ->
    @req.get = -> 'Chome'
    @redirect @req, @res, ->
    @res.redirect.called.should.not.be.ok()

  it 'respects stop_microgravity_redirect param', ->
    @req.get = -> 'Mobile Android'
    @req.query = stop_microgravity_redirect: true
    @redirect @req, @res, ->
    @res.redirect.called.should.not.be.ok()

  it 'does not redirect responsive pages', ->
    @res.locals.sd.IS_RESPONSIVE = true
    @redirect @req, @res, ->
    @res.redirect.called.should.not.be.ok()

  it 'sets IS_MOBILE if the user agent is a phone', ->
    @req.get.returns 'iPhone'
    @redirect @req, @res, ->
    @res.locals.sd.IS_MOBILE.should.be.true()
