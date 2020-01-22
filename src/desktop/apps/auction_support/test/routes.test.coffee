_ = require 'underscore'
rewire = require 'rewire'
routes = rewire '../routes'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../models/current_user.coffee'
moment = require 'moment'
Q = require 'bluebird-q'

openSale = fabricate 'sale',
  name: 'Awesome Sale'
  is_auction: true
  auction_state: 'open'
  start_at: moment().subtract(1, 'minutes').format()
  end_at: moment().add(3, 'minutes').format()

analyticsConstructorArgs = []
analyticsTrackArgs = []
resetAnalytics = ->
  analyticsTrackArgs = []
  analyticsConstructorArgs = []

describe '#modalAuctionRegistration', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

    analytics = class AnalyticsStub
      constructor: -> analyticsConstructorArgs = arguments
      track: -> analyticsTrackArgs = arguments
    routes.__set__('Analytics', analytics)

    @req = { params: { id: 'awesome-sale' }, query: {} }
    @res =
      status: sinon.stub()
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd:
          API_URL: 'http://localhost:5000',
          SEGMENT_WRITE_KEY: 'foo'
        asset: ->
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()
    resetAnalytics()
    @req.query = {}

  it 'redirects to login without user', ->
    routes.modalAuctionRegistration @req, @res
    @res.redirect.args[0][0].should.equal "/log_in?redirect_uri=/auction-registration/awesome-sale"

  describe 'with current user', ->

    beforeEach ->
      @req.user = new CurrentUser()

    it 'redirects to success url if sale is registerable and user has already registered', ->
      routes.modalAuctionRegistration @req, @res
      Backbone.sync.args[0][2].success openSale

      Backbone.sync.args[1][2].success [{foo: 'bar'}]

      routes.modalAuctionRegistration @req, @res

      @res.redirect.args[0][0].should.equal "/auction/whtney-art-party/confirm-registration"

    it 'creates bidder and redirects to sale if sale is registerable and user has credit card on file and user accepted conditions', ->
      @req.query = {'accepted-conditions': 'true' }
      routes.modalAuctionRegistration @req, @res
      Backbone.sync.args[0][2].success openSale
      Backbone.sync.args[1][2].success []
      Backbone.sync.args[2][2].success [{foo: 'bar'}]
      Backbone.sync.args[3][2].success [{}]

      # it sends analytics
      sentAnalytics = analyticsTrackArgs[0]
      sentAnalytics['event'].should.equal 'Registration submitted'
      sentAnalytics['properties']['auction_slug'].should.equal 'whtney-art-party'

      @res.redirect.args[0][0].should.equal "/auction/whtney-art-party/confirm-registration"

    it 'redirects to registration flow if sale is registerable and user has credit card on file but user did not accept conditions', ->
      routes.modalAuctionRegistration @req, @res
      Backbone.sync.args[0][2].success openSale
      Backbone.sync.args[1][2].success []
      Backbone.sync.args[2][2].success [{foo: 'bar'}]

      # no analytics
      analyticsTrackArgs.should.be.empty()
      @res.redirect.args[0][0].should.equal "/auction/whtney-art-party/registration-flow"

    it 'renders registration error page if sale is an auction and is not registerable', ->
      routes.modalAuctionRegistration @req, @res
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: true, auction_state: 'closed'

      @res.render.args[0][0].should.equal 'registration-error'
      @res.render.args[0][1].sale.get('name').should.equal 'Awesome Sale'

    it '404 if sale is not auction', ->
      routes.modalAuctionRegistration @req, @res, @next
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: false

      @next.args[0][0].status.should.equal 404
      @next.args[0][0].message.should.equal 'Not Found'
