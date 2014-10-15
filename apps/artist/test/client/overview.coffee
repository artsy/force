_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist'

describe 'OverviewView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @OverviewView = benv.requireWithJadeify resolve(__dirname, '../../client/views/overview'), ['template']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $.onInfiniteScroll = sinon.stub()
    sinon.stub _, 'defer', (cb) -> cb()
    sinon.stub Backbone, 'sync'
    sinon.stub(Artist::, 'related').returns({
      artists: length: 0
      contemporary: length: 0
      shows: length: 0
      posts: length: 0
    })
    @model = new Artist fabricate 'artist', id: 'foo-bar', published_artworks_count: 1
    @OverviewView.__set__ 'ArtworkFilter', init: @artworkFilterInitStub = sinon.stub().returns(view: new Backbone.View)
    @view = new @OverviewView model: @model
    @view.render()

  afterEach ->
    _.defer.restore()
    Backbone.sync.restore()
    @view.remove()
    @model.related.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.$('#artwork-section').length.should.equal 1

  describe 'setup', ->
    it 'checks on the correct relations', ->
      @view.model.related.callCount.should.equal 4
      # Way to spy on property access?
