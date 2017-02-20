_ = require 'underscore'
Q = require 'bluebird-q'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
Auction = require '../../../models/auction'
routes = rewire '../routes'
moment = require 'moment'

describe '/auction routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub Q, 'promise'
    routes.__set__ 'sailthru', @sailthru =
      apiGet: sinon.stub()
      apiPost: sinon.stub()
    @req = body: {}, params: id: 'foobar'
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      send: sinon.stub()
      locals: sd: {}
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()
    Q.promise.restore()

  it 'fetches the auction data and renders the index template', (done) ->
    routes.index @req, @res, @next

    Backbone.sync.callCount.should.equal 2

    Backbone.sync.args[0][1].url().should.containEql '/api/v1/sale/foobar'
    Backbone.sync.args[1][1].url().should.containEql '/api/v1/sale/foobar/sale_artworks'
    Backbone.sync.args[1][2].data.should.equal 'total_count=1&size=10'

    Backbone.sync.args[0][2].success fabricate 'sale', is_auction: true
    Backbone.sync.args[1][2].success {}

    _.defer => _.defer =>
      Q.promise.args[0][0]()
      _.last(Backbone.sync.args)[1].url.should.containEql '/api/articles'

      @next.called.should.be.false()
      @res.render.args[0][0].should.equal 'index'
      _.keys(@res.render.args[0][1]).should.eql [
        'auction'
        'artworks'
        'saleArtworks'
        'articles'
        'user'
        'state'
        'displayBlurbs'
        'maxBlurbHeight'
        'footerItems'
        'myActiveBids'
      ]
      done()

  it 'fetches the auction data and nexts to the sale if it is a sale', (done) ->
    routes.index @req, @res, @next
    Backbone.sync.args[0][2].success fabricate 'sale', is_auction: false
    Backbone.sync.args[1][2].success {}
    _.defer => _.defer =>
      @next.called.should.be.true()
      @res.render.called.should.be.false()
      done()

  it 'passes down the error', (done) ->
    routes.index @req, @res, @next
    @next.called.should.be.false()
    Backbone.sync.args[0][2].error()
    Backbone.sync.args[1][2].error()
    _.defer => _.defer =>
      @next.called.should.be.true()
      done()

  describe 'with logged in user', ->
    beforeEach (done) ->
      Backbone.sync.returns Promise.resolve(fabricate 'bidder')
      @req = user: new CurrentUser(id: 'foobar'), params: id: 'foobar'
      routes.index @req, @res, @next
      _.defer => _.defer =>
        @userReqs = _.last Backbone.sync.args, 1
        done()

    it 'fetches the bidder positions', ->
      @userReqs[0][2].url.should.containEql '/api/v1/me/bidders'
      @userReqs[0][2].data.sale_id.should.equal 'foobar'

    it 'sets the `registered_to_bid` attr', ->
      @userReqs[0][2].success ['existy']
      @req.user.get('registered_to_bid').should.be.true()

  describe '#inviteForm', ->

    it 'submits to sailthru including previously subscribed auctions', ->
      @sailthru.apiGet.callsArgWith(2, null, vars: auction_slugs: ['foo'])
      @sailthru.apiPost.callsArgWith(2, null, {})
      @req.params.id = 'bar'
      @req.body.email = 'foobar@baz.com'
      routes.inviteForm @req, @res, @next
      @sailthru.apiPost.args[0][1].vars.auction_slugs.join(',')
        .should.equal 'foo,bar'

    it 'sets source if it doesnt exist', ->
      @sailthru.apiGet.callsArgWith(2, null, vars: source: 'foo')
      routes.inviteForm @req, @res, @next
      @sailthru.apiPost.args[0][1].vars.source.should.equal 'foo'
      @sailthru.apiGet.callsArgWith(2, null, vars: source: null)
      routes.inviteForm @req, @res, @next
      @sailthru.apiPost.args[1][1].vars.source.should.equal 'auction'

    it 'continues fine for ST error 99 (user not found)', ->
      @req.params.id = 'baz'
      @sailthru.apiGet.callsArgWith(2, { error: 99 })
      routes.inviteForm @req, @res, @next
      @sailthru.apiGet.callsArgWith(2, null, vars: source: null)
      routes.inviteForm @req, @res, @next
      @sailthru.apiPost.args[1][1].vars.source.should.equal 'auction'
      @sailthru.apiPost.args[0][1].vars.auction_slugs.join(',')
        .should.equal 'baz'

describe '#redirectLive', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req =
      body: {},
      params: id: 'foobar'
      user: new CurrentUser(fabricate 'user')
    @res = redirect: sinon.stub()
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  it 'redirects on confirm if the auction is live and bidder is qualified', (done) ->
    auction = fabricate 'sale',
      id: 'foo'
      is_auction: true
      auction_state: 'open'
      start_at: moment().startOf('day')
      live_start_at: moment().startOf('day')
      end_at: moment().endOf('day')
    bidder = {
      id: 'me',
      qualified_for_bidding: true,
      sale: auction
    }
    @res =
      redirect: (url) ->
        url.should.equal 'https://live.artsy.net/foo/login'
        done()
    routes.redirectLive @req, @res, @next
    Backbone.sync.args[0][2].success auction
    Backbone.sync.args[1][2].success [bidder]
    Backbone.sync.args[2][2].success bidder

  it 'does not redirect if bidder is not qualified', () ->
    auction = fabricate 'sale',
      id: 'foo'
      is_auction: true
      start_at: moment().startOf('day')
      auction_state: 'open'
      live_start_at: moment().startOf('day')
      end_at: moment().endOf('day')
    bidder = {
      id: 'me',
      qualified_for_bidding: false,
      sale: auction
    }
    routes.redirectLive @req, @res, @next
    Backbone.sync.args[0][2].success auction
    Backbone.sync.args[1][2].success [bidder]
    Backbone.sync.args[2][2].success bidder
    @res.redirect.called.should.not.be.ok()
    @next.called.should.be.ok()

  it 'does not redirect on confirm if the auction is not live', () ->
    auction = fabricate 'sale',
      id: 'foo'
      is_auction: true
      auction_state: 'open'
      live_start_at: null
      end_at: moment().endOf('day')
    routes.redirectLive @req, @res, @next
    Backbone.sync.args[0][2].success auction
    @res.redirect.called.should.not.be.ok()
    @next.called.should.be.ok()
