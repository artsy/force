_ = require 'underscore'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'
rewire = require 'rewire'
routes = rewire '../routes'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'

describe '#index', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'renders the feature page', ->
    routes.index { params: { id: 'awesome-feature' } }, { locals: { sd: {} }, render: renderStub = sinon.stub() }
    Backbone.sync.args[0][2].success fabricate 'feature', name: 'Awesome Feature'
    renderStub.args[0][0].should.equal 'page'
    renderStub.args[0][1].feature.get('name').should.equal 'Awesome Feature'

describe '#bid', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = session: {}, params: {}, get: sinon.stub()
    @res = render: sinon.stub(), locals: sd: {}
    @next = sinon.stub()
    routes.__set__ 'metaphysics', @metaphysics = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  it 'handles users who are logged in and registered/unqualified', (done) ->
    @metaphysics.returns Promise.resolve
      artwork: sale_artwork: bid_increments: [100, 200]
      me: {
        has_qualified_credit_cards: true
        bidders: [{ id: 'foo', qualified_for_bidding: false }]
        lot_standing: null
      }
    routes.bid @req, @res, done
    Backbone.sync.args[0][2].success fabricate 'artwork'
    Backbone.sync.args[1][2].success [fabricate 'sale', is_auction: true]
    Backbone.sync.args[2][2].success fabricate 'sale_artwork'
    _.defer =>
      @res.render.called.should.be.ok()
      @res.render.args[0][1].registered.should.be.true
      @res.render.args[0][1].qualified.should.be.true
      @res.render.args[0][1].hasQualifiedCreditCard.should.be.true
      done()

  it 'handles users who are logged in and registered/qualified', (done) ->
    @metaphysics.returns Promise.resolve
      artwork: sale_artwork: bid_increments: [100, 200]
      me: {
        has_qualified_credit_cards: true
        bidders: [{ id: 'foo', qualified_for_bidding: false }]
        lot_standing: null
      }
    routes.bid @req, @res, done
    Backbone.sync.args[0][2].success fabricate 'artwork'
    Backbone.sync.args[1][2].success [fabricate 'sale', is_auction: true]
    Backbone.sync.args[2][2].success fabricate 'sale_artwork'
    _.defer =>
      @res.render.called.should.be.ok()
      @res.render.args[0][1].registered.should.be.true
      @res.render.args[0][1].qualified.should.be.false
      @res.render.args[0][1].hasQualifiedCreditCard.should.be.true
      done()

  it 'converts to dollars and renders the bid confirmation amount from the query', (done) ->
    @req = session: {}, params: {}, query: { bid: 20000 }, get: sinon.stub()
    @metaphysics.returns Promise.resolve
      artwork: sale_artwork: bid_increments: [100, 200]
      me: {
        has_qualified_credit_cards: true
        bidders: [{ id: 'foo', qualified_for_bidding: false }]
        lot_standing: null
      }

    routes.bid @req, @res, done

    Backbone.sync.args[0][2].success fabricate 'artwork'
    Backbone.sync.args[1][2].success [fabricate 'sale', is_auction: true]
    Backbone.sync.args[2][2].success fabricate 'sale_artwork'

    _.defer =>
      @res.render.args[0][1].maxBid.should.equal(200)
      done()

  it 'handles users who are logged in but not registered and do not have a qualified credit card', (done) ->
    @metaphysics.returns Promise.resolve
      artwork: sale_artwork: bid_increments: [100, 200]
      me: {
        has_qualified_credit_cards: false
        bidders: null
        lot_standing: null
      }
    routes.bid @req, @res, done
    Backbone.sync.args[0][2].success fabricate 'artwork'
    Backbone.sync.args[1][2].success [fabricate 'sale', is_auction: true]
    Backbone.sync.args[2][2].success fabricate 'sale_artwork'
    _.defer =>
      @res.render.called.should.be.ok()
      @res.render.args[0][1].registered.should.be.false
      @res.render.args[0][1].qualified.should.be.false
      @res.render.args[0][1].hasQualifiedCreditCard.should.be.false
      done()

  it 'handles users who are logged in but not registered and do have a qualified credit card', (done) ->
    @metaphysics.returns Promise.resolve
      artwork: sale_artwork: bid_increments: [100, 200]
      me: {
        has_qualified_credit_cards: true
        bidders: null
        lot_standing: null
      }
    routes.bid @req, @res, done
    Backbone.sync.args[0][2].success fabricate 'artwork'
    Backbone.sync.args[1][2].success [fabricate 'sale', is_auction: true]
    Backbone.sync.args[2][2].success fabricate 'sale_artwork'
    _.defer =>
      @res.render.called.should.be.ok()
      @res.render.args[0][1].registered.should.be.false
      @res.render.args[0][1].qualified.should.be.false
      @res.render.args[0][1].hasQualifiedCreditCard.should.be.true
      done()

  it 'handles empty bidder status from MP', (done) ->
    @metaphysics.returns Promise.resolve
      artwork: sale_artwork: bid_increments: [100, 200]
      me: lot_standing: most_recent_bid: max_bid: cents: 100
    routes.bid @req, @res, done
    Backbone.sync.args[0][2].success fabricate 'artwork'
    Backbone.sync.args[1][2].success [fabricate 'sale', is_auction: true]
    Backbone.sync.args[2][2].success fabricate 'sale_artwork'
    _.defer =>
      @res.render.called.should.be.ok()
      done()

describe '#confirmRegistration', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = params: {}
    @res = { render: @render = sinon.stub() }

  afterEach ->
    Backbone.sync.restore()

  it 'points back to the artwork page after confirming from an artwork page', ->
    @req.params.id = 'foo-bar'
    routes.confirmRegistration('artwork') @req, @res
    @res.render.args[0][1].href.should.containEql "/artwork/foo-bar"

  it 'points back to the bid page after confirming from a bid page', ->
    @req.params = id: 'two-x-two', artworkId: 'foo-bar'
    routes.confirmRegistration('bid') @req, @res
    @res.render.args[0][1].href.should.containEql "/auction/two-x-two/bid/foo-bar"
