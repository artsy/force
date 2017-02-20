sinon = require 'sinon'
middleware = require '../middleware'

describe 'showMarketingSignupModal', ->
  beforeEach ->
    @req = query: { 'm-id': 'foo' }
    @res =
      locals:
        sd:
          APP_URL: 'http://www.artsy.net'
          MARKETING_SIGNUP_MODALS: [{slug: "foo", copy: "welcome to artsy", image: "img.jpg", photoCredit: "Photo by Artsy"}]
        modal: {slug: "foo", copy: "welcome to artsy", image: "img.jpg", photoCredit: "Photo by Artsy"}
    @next = sinon.stub()

  it 'shows the modal if coming from a campaign', ->
    middleware @req, @res, @next
    @res.locals.showMarketingSignupModal.should.be.ok()

  it 'does not show the modal if coming from artsy', ->
    @req.query = {}
    middleware @req, @res, @next
    (@res.locals.showMarketingSignupModal?).should.not.be.ok()

  it 'does not show the modal if logged in', ->
    @req.user = name: 'Andy'
    @req.path = '/foo'
    @req.get = sinon.stub().returns 'google.com'
    middleware @req, @res, @next
    (@res.locals.showMarketingSignupModal?).should.not.be.ok()
