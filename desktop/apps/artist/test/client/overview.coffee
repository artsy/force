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
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
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

    sinon.stub(_, 'defer').callsFake (cb) -> cb()
    sinon.stub Backbone, 'sync'
    sinon.stub(Artist::, 'related').returns({
      artists: length: 0
      contemporary: length: 0
      shows: length: 0
      articles: length: 0
    })
    @model = new Artist artistJSON
    filterView = new Backbone.View
    filterView.artworks = new Backbone.Collection
    filterView.filter = root: new Backbone.Model
    @OverviewView.__set__ 'initWorksSection', sinon.stub()
    @OverviewView::setupRelatedArticles = ->
    @OverviewView.__set__ 'lastModified', sinon.stub()
    @view = new @OverviewView model: @model, statuses: {}
    sinon.stub @view, 'postRender'
    @view.filterView = filterView
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
