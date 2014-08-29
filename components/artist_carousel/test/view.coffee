_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'
ArtistCarouselView = rewire '../view'
ArtistCarouselView.__set__ 'CarouselView', Backbone.View

describe 'ArtistCarouselView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub ArtistCarouselView::, 'checkRelatedShows'
    @artist = new Artist fabricate 'artist', published_artworks_count: 4, id: 'foobar'
    @view = new ArtistCarouselView model: @artist

  afterEach ->
    @view.checkRelatedShows.restore()
    Backbone.sync.restore()

  describe 'artist without the minimum # of works', ->
    beforeEach ->
      sinon.spy ArtistCarouselView::, 'remove'

    afterEach ->
      @view.remove.restore()

    it 'removes itself', ->
      view = new ArtistCarouselView model: new Artist published_artworks_count: 3
      view.$el.html().should.be.empty
      view.remove.called.should.be.true

  describe '#initialize', ->
    it 'renders the loading state', ->
      @view.$el.html().should.containEql 'loading-spinner'

    it 'fetches iconic works', ->
      Backbone.sync.args[0][1].url.should.containEql 'api/v1/artist/foobar/artworks'
      Backbone.sync.args[0][2].data.should.eql sort: '-iconicity', published: true, size: 7

  describe '#render', ->
    beforeEach ->
      sinon.spy ArtistCarouselView::, 'render'

    afterEach ->
      @view.render.restore()

    it 'renders once the iconic works are fetched + when the related shows event comes in', ->
      Backbone.sync.args[0][2].success _.times 4, -> fabricate 'artwork_image'
      @view.render.callCount.should.equal 1
      @view.model.relatedShows.trigger 'sync'
      @view.checkRelatedShows.called.should.be.true
      _.isUndefined(@view.rendered).should.be.true
      @view.render()
      @view.rendered.should.be.true
