sinon = require 'sinon'
rewire = require 'rewire'
middleware = rewire '../../../lib/middleware/marketing_modals'

describe 'showMarketingSignupModal', ->
  beforeEach ->
    data = [{slug: "foo", copy: "welcome to artsy", image: "img.jpg", photoCredit: "Photo by Artsy"}]
    @req = query: { 'm-id': 'foo' }
    @res =
      locals:
        sd:
          IS_MOBILE: true
          APP_URL: 'http://www.artsy.net'
          MOBILE_MARKETING_SIGNUP_MODALS: data
          MARKETING_SIGNUP_MODALS: data
        modal: {slug: "foo", copy: "welcome to artsy", image: "img.jpg"}
    middleware.__set__ "JSONPage", class MockJSONPage
        get: -> 
            new Promise (resolve, reject) ->
              resolve({modals: data})

  it 'shows the modal if coming from a campaign', ->
    middleware @req, @res, =>
      (@res.locals.showMarketingSignupModal?).should.be.ok()

  it 'does not show the modal if coming from artsy', ->
    @req.query = {}
    middleware @req, @res, =>
      (@res.locals.showMarketingSignupModal?).should.not.be.ok()

  it 'does not show the modal if logged in', ->
    @req.user = name: 'Andy'
    @req.path = '/foo'
    @req.get = sinon.stub().returns 'google.com'
    middleware @req, @res, =>
      (@res.locals.showMarketingSignupModal?).should.not.be.ok()
