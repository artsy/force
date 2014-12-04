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
    filterView = new Backbone.View
    filterView.artworks = new Backbone.Collection
    filterView.filter = root: new Backbone.Model
    @OverviewView.__set__ 'ArtworkFilter', init: @artworkFilterInitStub = sinon.stub().returns(view: filterView)
    @OverviewView.__set__ 'STATUSES', {}
    @OverviewView.__set__ 'lastModified', sinon.stub()
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
