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

  it 'render the bid page and form'
  it 'fetches the auction, artwork, and checks if the user is registered'
  it 'bootstraps the sale artwork'
  it 'handles logged out users by passing registered: false'
  it 'passes the current url as the redirect_to register url'

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

  it 'points back to the bid page after confirming from an bid page', ->
    @req.params = id: 'two-x-two', artworkId: 'foo-bar'
    routes.confirmRegistration('bid') @req, @res
    @res.render.args[0][1].href.should.containEql "/auction/two-x-two/bid/foo-bar"

  it 'points back to the auction page after confirming from an auction page', ->
    @req.params = id: 'two-x-two'
    routes.confirmRegistration('auction') @req, @res
    @res.render.args[0][1].href.should.containEql "/auction/two-x-two"
