_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'FilterArtworksView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      FilterArtworksView = benv.require resolve __dirname, '../view'
      FilterArtworksView.__set__ 'mediator', @mediator = {
        trigger: sinon.stub()
        on: sinon.stub()
      }
      FilterArtworksView.__set__ 'FilterSortCount', class @FilterSortCount extends Backbone.View
        initialize: ->
      FilterArtworksView.__set__ 'ArtworkColumnsView', class @ArtworkColumnsView extends Backbone.View
        initialize: ->
        appendArtworks: sinon.stub()
      $.fn.infiniteScroll = sinon.stub()
      sinon.stub Backbone, 'sync'
      @view = new FilterArtworksView
        el: $ "<div></div>"
        url: "/api/v1/search/filtered/gene/foo"
      done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe '#newColumnsView', ->

    it 're-adds the column view to reset the feed', ->
      @view.newColumnsView()
      @view.columnsView.collection.reset [fabricate('artwork'), fabricate('artwork')]
      @view.newColumnsView()
      @view.columnsView.collection.length.should.equal 0

  describe '#reset', ->

    it 'triggers the next page fetching the filtered artworks', ->
      @view.params.on 'change:page', spy = sinon.spy()
      @view.reset()
      spy.called.should.be.ok

  describe '#nextPage', ->

    it 'fetches the next page of artworks', ->
      @view.params.set page: 1
      @view.nextPage()
      @view.params.get('page').should.equal 2

  describe '#render', ->

    it 'renders the columns view', ->
      @view.render()
      @ArtworkColumnsView::appendArtworks.called.should.be.ok