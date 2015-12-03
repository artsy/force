_ = require 'underscore'
sinon = require 'sinon'
welcomeBannerMiddleware = require '../middleware'

describe 'welcomeBannerMiddleware', ->
  beforeEach ->
    @req =
      cookies: {}
    @res =
      cookie: sinon.stub()
      locals: sd: {}
    @next = sinon.stub()

  describe 'has not seen banner, logged out user', ->
    it 'does not set a HIDE_HEADER sd flag', ->
      welcomeBannerMiddleware @req, @res, @next
      _.isUndefined(@res.locals.sd.HIDE_HEADER).should.be.true()

    it 'does not set a cookie', ->
      welcomeBannerMiddleware @req, @res, @next
      @res.cookie.called.should.be.false()

  describe 'has seen banner, logged out user', ->
    beforeEach ->
      @req.cookies['hide-force-header'] = '1'

    it 'does not set a cookie', ->
      welcomeBannerMiddleware @req, @res, @next
      @res.cookie.called.should.be.false()

    it 'sets a HIDE_HEADER sd flag', ->
      welcomeBannerMiddleware @req, @res, @next
      @res.locals.sd.HIDE_HEADER.should.equal '1'

  describe 'has not seen banner, logged in user', ->
    beforeEach ->
      @req.user = 'existy'

    it 'sets a cookie', ->
      welcomeBannerMiddleware @req, @res, @next
      @res.cookie.called.should.be.true()

    it 'sets a HIDE_HEADER sd flag', ->
      welcomeBannerMiddleware @req, @res, @next
      @res.locals.sd.HIDE_HEADER.should.equal '1'
