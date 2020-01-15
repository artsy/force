_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

describe 'FilterArtworksView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      Backbone.$ = $
      sinon.stub _, 'defer'
      FilterArtworksView = benv.require resolve __dirname, '../view'
      for klass in ['ArtworkColumnsView', 'FilterSortCount', 'FilterFixedHeader', 'FilterRouter']
        @[klass] = (opts) -> _.extend @, opts
        sinon.spy @, klass
        for method in ['appendArtworks', 'reset', 'remove']
          @[klass].prototype[method] = sinon.stub()
        FilterArtworksView.__set__ klass, @[klass]
      $.onInfiniteScroll = sinon.stub()
      sinon.stub Backbone, 'sync'
      @view = new FilterArtworksView
        el: $ "<div></div>"
        url: "/api/v1/search/filtered/gene/foo"
      done()

  afterEach ->
    Backbone.sync.restore()
    _.defer.restore()
    benv.teardown()

  describe '#initialize', ->

    it 'creates a router', ->
      @FilterRouter.args[0][0].params.should.equal @view.params
      @view.params.get('size').should.equal 10

  describe '#newColumnsView', ->

    it 're-adds the column view to reset the feed', ->
      @view.newColumnsView()
      @view.columnsView.collection.reset [fabricate('artwork'), fabricate('artwork')]
      @view.newColumnsView()
      @view.columnsView.collection.length.should.equal 0

  describe '#reset', ->

    it 'triggers the next page fetching the filtered artworks', ->
      spy = sinon.spy()
      @view.params.on 'change:page', spy
      @view.params.on 'change', spy
      @view.reset()
      @view.params.get('size').should.equal 10
      spy.callCount.should.equal 2

  describe '#nextPage', ->

    it 'fetches the next page of artworks', ->
      @view.params.set page: 1
      @view.nextPage()
      @view.params.get('page').should.equal 2
      @view.params.get('size').should.equal 10

    it 'defaults to page 1 and avoids NaNs', ->
      @view.params.set page: NaN
      @view.nextPage()
      @view.params.get('page').should.equal 1

  describe '#reset', ->

    xit 'fetches the correct counts', ->
      @view.params.set related_gene: 'photography', medium: 'digital-print'
      @view.reset()
      Backbone.sync.args[1][2].data.should.eql
        related_gene: 'photography'
        medium: 'digital-print'

  describe '#render', ->

    it 'renders the columns view', ->
      @view.render()
      @ArtworkColumnsView::appendArtworks.called.should.be.ok()
