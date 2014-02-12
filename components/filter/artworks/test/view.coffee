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

    it 'fetches the filtered artworks', ->
      @view.reset { dimension: 24 }
      Backbone.sync.args[0][2].data.dimension.should.equal 24


  describe '#nextPage', ->

    it 'fetches the next page of artworks', ->
      @view.nextPage()
      Backbone.sync.args[0][1].url.should.include '/filtered/gene'
      Backbone.sync.args[0][2].data.page.should.equal @view.params.page

  describe '#render', ->

    it 'renders the columns view', ->
      @view.render()
      @ArtworkColumnsView::appendArtworks.called.should.be.ok