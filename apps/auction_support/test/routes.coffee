_ = require 'underscore'
rewire = require 'rewire'
routes = rewire '../routes'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user.coffee'
moment = require 'moment'
Q = require 'bluebird-q'

openSale = fabricate 'sale',
  name: 'Awesome Sale'
  is_auction: true
  auction_state: 'open'
  start_at: moment().subtract(1, 'minutes').format()
  end_at: moment().add(3, 'minutes').format()
routes.__set__ 'metaphysics', sinon.stub().returns(
  Q.resolve(artwork: sale_artwork: bid_increments: [100])
)

describe '#auctionRegistration', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'awesome-sale' } }
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
    @res.redirect.args[0][0].should.equal "/log_in?redirect_uri=/auction-registration/awesome-sale"

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

    it 'creates bidder and redirects to sale if sale is registerable and user has credit card on file', ->
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success openSale
      Backbone.sync.args[1][2].success []
      Backbone.sync.args[2][2].success [{foo: 'bar'}]
      Backbone.sync.args[3][2].success [{}]

      @res.redirect.args[0][0].should.equal "/auction/whtney-art-party/confirm-registration"

    it 'renders registration error page if sale is an auction and is not registerable', ->
      routes.auctionRegistration @req, @res
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: true, auction_state: 'closed'

      @res.render.args[0][0].should.equal 'registration-error'
      @res.render.args[0][1].sale.get('name').should.equal 'Awesome Sale'

    it '404 if sale is not auction', ->
      routes.auctionRegistration @req, @res, @next
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: false

      @next.args[0][0].status.should.equal 404
      @next.args[0][0].message.should.equal 'Not Found'

describe '#bid', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'awesome-sale', artwork: 'artwork-id' }, query: { bid: '50000'} }
    @res =
      status: sinon.stub()
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd:
          API_URL: 'http://localhost:5000'
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  it 'redirects to login without user', ->
    routes.bid @req, @res
    @res.redirect.args[0][0].should.equal "/log_in?redirect_uri=/auction/awesome-sale/bid/artwork-id"

  describe 'with current user', ->

    beforeEach ->
      @resolve = (a, b, c, d) =>
        Backbone.sync.args[0][2].success a or openSale
        Backbone.sync.args[1][2].success b or fabricate 'sale_artwork'
        Backbone.sync.args[2][2].success c or [{foo: 'bar'}]
        Backbone.sync.args[3][2].success d or [fabricate('bidder_position')]
      @req.user = new CurrentUser()
      routes.bid @req, @res, @next

    it 'renders with isRegistered: true if is registered', ->
      @resolve()
      @res.render.args[0][0].should.equal 'bid-form'
      @res.render.args[0][1].isRegistered.should.be.ok()
      @res.render.args[0][1].maxBid.should.equal 500

    it 'renders with isRegistered: true if is not registered', ->
      @resolve(null, null, [], null)
      @res.render.args[0][0].should.equal 'bid-form'
      @res.render.args[0][1].isRegistered.should.not.be.ok()

    it '404 if sale is not auction', ->
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: false
      @next.args[0][0].status.should.equal 404
      @next.args[0][0].message.should.equal 'Not Found'

    it '404 if sale not active', ->
      Backbone.sync.args[0][2].success fabricate 'sale', name: 'Awesome Sale', is_auction: true, auction_state: 'closed'
      @next.args[0][0].status.should.equal 404
      @next.args[0][0].message.should.equal 'Not Found'

    it 'passes the bidder positions', ->
      @resolve null, null, null, [fabricate 'bidder_position', moo: 'bar']
      @res.locals.sd.BIDDER_POSITIONS[0].moo.should.equal 'bar'
