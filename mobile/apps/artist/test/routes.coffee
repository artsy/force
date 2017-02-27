{ fabricate } = require 'antigravity'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
Q = require 'bluebird-q'
_ = require 'underscore'

describe '#index', ->

  beforeEach ->
    @req =
      params:
        id: 'artist-id'
    @res =
      locals:
        sd: {}
      render: sinon.stub()
    @next = sinon.stub()
    sinon.stub Backbone, 'sync'
      .onCall 0
      .returns Promise.resolve fabricate('artist', name: 'Oliver')
      .onCall 1
      .returns Promise.resolve []
      .onCall 2
      .returns Promise.resolve [fabricate('artwork', title: 'A Great Painting'), fabricate('artwork')]

  afterEach ->
    Backbone.sync.restore()

  it 'renders the page template', ->
    routes.index(@req, @res, @next).then =>
      @res.render.args[0][0].should.equal 'page'

  it 'fetches the correct artist', ->
    routes.index(@req, @res, @next).then =>
      @res.locals.sd.ARTIST.should.exist
      @res.locals.sd.ARTIST.name.should.equal 'Oliver'

  it 'fetches the correct artworks', ->
    routes.index(@req, @res, @next).then =>
      @res.locals.sd.ARTWORKS.length.should.equal 2
      @res.locals.sd.ARTWORKS[0].title.should.equal 'A Great Painting'

describe "#biography", ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    artist = fabricate 'artist', id: 'damien-hershey'
    routes.__set__ 'metaphysics', => Q.resolve { artist: artist }
    @req = { params: {} }
    @res = render: sinon.stub(), locals: sd: sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  it 'renders the biography page', ->
    routes.biography @req, @res
    _.defer => _.defer =>
      @res.render.args[0][0].should.equal 'biography'
      @res.render.args[0][1].artist.id.should.equal 'damien-hershey'

describe '#auctionResults', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: {} }
    @res = { locals: { sd: {}, asset: (->) }, render: @render = sinon.stub() }

  afterEach ->
    Backbone.sync.restore()

  it 'renders the auction results page', ->
    routes.auctionResults(@req, @res)
    Backbone.sync.args[0][2].success fabricate 'artist'
    Backbone.sync.args[1][2].success [ fabricate 'auction_result' ]
    @render.args[0][0].should.equal 'auction_results'
    @render.args[0][1].auctionResults[0].get('estimate_text').should.containEql '120,000'
