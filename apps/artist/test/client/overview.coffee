_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist'
artistJSON = require '../fixtures'

describe 'OverviewView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @OverviewView = benv.requireWithJadeify require.resolve('../../client/views/overview'), ['template']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $.onInfiniteScroll = sinon.stub()

    $.waypoints or= -> #
    $.fn.waypoint or= -> #
    sinon.stub $, 'waypoints'
    sinon.stub $.fn, 'waypoint'

    sinon.stub _, 'defer', (cb) -> cb()
    sinon.stub Backbone, 'sync'
    sinon.stub(Artist::, 'related').returns({
      artists: new Backbone.Collection
      contemporary: new Backbone.Collection
      shows: new Backbone.Collection
      articles: new Backbone.Collection
    })
    @model = new Artist artistJSON
    filterView = new Backbone.View
    filterView.artworks = new Backbone.Collection
    filterView.filter = root: new Backbone.Model
    @OverviewView.__set__ 'ArtworkFilter', init: @artworkFilterInitStub = sinon.stub().returns(view: filterView)
    @OverviewView::setupRelatedArticles = ->
    @OverviewView.__set__ 'lastModified', sinon.stub()
    @view = new @OverviewView model: @model, statuses: artistJSON.statuses
    @view.render()

  afterEach ->
    _.defer.restore()
    Backbone.sync.restore()
    @view.remove()
    @model.related.restore()
    $.waypoints.restore()
    $.fn.waypoint.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.$('#artwork-section').length.should.equal 1
