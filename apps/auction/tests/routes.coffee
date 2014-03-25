_             = require 'underscore'
routes        = require '../routes'
sinon         = require 'sinon'
Backbone      = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser   = require '../../../models/current_user.coffee'

describe '#auctionRegistration', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'awesome-sale' } }
    @res =
      status  : sinon.stub()
      render  : sinon.stub()
      redirect: sinon.stub()
      locals  :
        sd:
          ASSET_PATH: "http://localhost:5000"
          ARTSY_URL : 'http://localhost:5000'
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  it 'redirects to login without user', ->
    routes.auctionRegistration @req, @res
    @res.redirect.args[0][0].should.equal "/log_in?redirect_uri=/auction-registration/awesome-sale"

  describe 'with current user', ->

    beforeEach ->
      @req.user = new CurrentUser()

    it 'redirects to success url if sale is registerable and user has already registered', ->
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: true, auction_state: 'open'
      Backbone.sync.args[1][2].success [{foo: 'bar'}]

      routes.auctionRegistration @req, @res

      @res.redirect.args[0][0].should.equal "/feature/whtney-art-party/confirm-registration"

    it 'renders registration form if sale is registerable and user has no credit cards on file', ->
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: true, auction_state: 'open'
      Backbone.sync.args[1][2].success []
      Backbone.sync.args[2][2].success []

      @res.render.args[0][0].should.equal 'templates/registration'
      @res.render.args[0][1].sale.get('name').should.equal 'Awesome Sale'

    it 'creates bidder and redirects to sale if sale is registerable and user has credit card on file', ->
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: true, auction_state: 'open'
      Backbone.sync.args[1][2].success []
      Backbone.sync.args[2][2].success [{foo: 'bar'}]
      Backbone.sync.args[3][2].success [{}]

      @res.redirect.args[0][0].should.equal "/feature/whtney-art-party/confirm-registration"

    it 'renders registration error page if sale is an auction and is not registerable', ->
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: true, auction_state: 'closed'

      @res.render.args[0][0].should.equal 'templates/registration_error'
      @res.render.args[0][1].sale.get('name').should.equal 'Awesome Sale'

    it '404 if sale is not auction', ->
      routes.auctionRegistration @req, @res, @next
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: false

      @res.status.args[0][0].should.equal 404
      @next.args[0][0].message.should.equal 'Not Found'
