_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'
benv = require 'benv'
{ resolve } = require 'path'

describe 'HomePageView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        analytics: { track: sinon.stub() }
        Element: window.Element
      Backbone.$ = $
      benv.render resolve(__dirname, '../templates/page.jade'), {
        heroUnits: []
        sd: {}
      }, =>
        @HomePageView = benv.requireWithJadeify resolve(__dirname, '../client/view'),
          ['featuredItemsTemplate', 'currentShowsTemplate', 'artworkColumnsTemplate']
        sinon.stub Backbone, 'sync'
        @HomePageView.__set__ 'Flickity', @Flickity = sinon.stub()
        @HomePageView.__set__ 'sd', {}
        @view = new @HomePageView
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe '#initialize', ->

    it 'renders shows on sync', ->
      @view.onSync = sinon.stub()
      @view.initialize()
      @view.collection.trigger 'sync'
      @view.onSync.called.should.be.ok()

    xit 'on infinite scroll calls next page on the collection with no arguments', ->
      @view.shows.nextPage = sinon.stub()
      $(window).trigger 'infiniteScroll'
      @view.shows.nextPage.args[0].length.should.equal 0

    it 'sets up hero units', ->
      @view.onSync = sinon.stub()
      @view.initialize()
      @Flickity.args[0][0].should.equal '#carousel-track'
      @Flickity.args[0][1].autoPlay.should.equal 10000

  describe '#renderCurrentShows', ->

    it 'renders the current shows', ->
      @view.collection.reset [
        fabricate 'show', name: 'Kittens on the wall'
      ]
      @view.onSync()
      @view.$el.html().should.containEql 'Kittens on the wall'

  xdescribe '#onSwipeStart', ->

  xdescribe '#onSwipeEnd', ->
  