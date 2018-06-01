_ = require 'underscore'
routes = require '../routes'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user.coffee'
moment = require 'moment'
openSale = fabricate 'sale',
  name: 'Awesome Sale'
  is_auction: true
  auction_state: 'open'
  start_at: moment().subtract(1, 'minutes').format()
  end_at: moment().add(3, 'minutes').format()

describe '#auctionRegistration', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req =
      params: { id: 'awesome-sale' }
      query: {}
    @res =
      status: sinon.stub()
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd:
          API_URL: 'http://localhost:5000'
        asset: ->
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  it 'redirects to login without user', ->
    routes.auctionRegistration @req, @res
    @res.redirect.args[0][0].should.equal "/log_in?redirect_uri=/auction-registration/awesome-sale?redirect_uri=undefined"

  describe 'with current user', ->

    beforeEach ->
      @req.user = new CurrentUser()

    it 'redirects to success url if sale is registerable and user has already registered', ->
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success openSale

      Backbone.sync.args[1][2].success [{foo: 'bar'}]

      routes.auctionRegistration @req, @res

      @res.redirect.args[0][0].should.equal "/auction/whtney-art-party/confirm-registration"

    it 'renders registration form if sale is registerable and user has no credit cards on file', ->
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success openSale
      Backbone.sync.args[1][2].success []
      Backbone.sync.args[2][2].success []

      @res.render.args[0][0].should.equal 'registration'
      @res.render.args[0][1].sale.get('name').should.equal 'Awesome Sale'

    it 'creates bidder and redirects to sale if sale is registerable and user has credit card on file and user has accepted conditions', ->
      @req.query = {'accepted-conditions': 'true' }
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success openSale
      Backbone.sync.args[1][2].success []
      Backbone.sync.args[2][2].success [{foo: 'bar'}]
      Backbone.sync.args[3][2].success [{}]

      @res.redirect.args[0][0].should.equal "/auction/whtney-art-party/confirm-registration"

    it 'redirects to modal if user has credit card on file and has not accepted conditions', ->
      @req.query = {'accepted-conditions': 'false' } # explicitly passed as false
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success openSale
      Backbone.sync.args[1][2].success []
      Backbone.sync.args[2][2].success [{foo: 'bar'}]
      @res.redirect.args[0][0].should.equal "/auction/whtney-art-party/registration-flow"

    it 'redirects to modal if user has credit card on file and has not accepted conditions', ->
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success openSale
      Backbone.sync.args[1][2].success []
      Backbone.sync.args[2][2].success [{foo: 'bar'}]
      @res.redirect.args[0][0].should.equal "/auction/whtney-art-party/registration-flow"

    it 'renders registration error page if sale is an auction and is not registerable', ->
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: true, auction_state: 'closed'

      @res.render.args[0][0].should.equal 'registration-error'
      @res.render.args[0][1].sale.get('name').should.equal 'Awesome Sale'

    it 'redirects to url if redirect_uri param is passed', ->
      @req.query =
        redirect_uri: '/auction/whtney-art-party/artwork-cool/bid'

      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success openSale
      Backbone.sync.args[1][2].success [{foo: 'bar'}]

      @res.redirect.args[0][0].should.equal @req.query.redirect_uri

    it '404 if sale is not auction', ->
      routes.auctionRegistration @req, @res, @next
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: false

      @next.args[0][0].status.should.equal 404
      @next.args[0][0].message.should.equal 'Not Found'
