rewire        = require 'rewire'
benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
AuctionLots   = require '../../../../collections/auction_lots'
Artist        = require '../../../../models/artist'
_             = require 'underscore'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'

describe 'ArtistView', ->

  before (done) ->
    sinon.stub _, 'defer'
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/index.jade'), {
      sd     : {}
      artist : new Artist(fabricate('artist'))
    }, =>
      { ArtistView, @init } = mod = benv.requireWithJadeify(
        (resolve __dirname, '../../client/index'), ['relatedArtistsTemplate']
      )
      @FillwidthView = sinon.stub()
      @FillwidthView.nextPage = sinon.stub()
      @FillwidthView.render = sinon.stub()
      @FillwidthView.returns @FillwidthView
      mod.__set__ 'FillwidthView', @FillwidthView
      mod.__set__ 'BlurbView', @blurbStub = sinon.stub()
      mod.__set__ 'RelatedPostsView', @relatedPostStub = sinon.stub()
      mod.__set__ 'RelatedGenesView', @genesStub = sinon.stub()
      @view = new ArtistView
        el: $ 'body'
        model: new Artist fabricate 'artist'
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    beforeEach ->
      @view.initialize()

    it 'sets up fillwidth views with collections pointing to for sale and not for sale works', ->
      view1Opts = @FillwidthView.args[0][0]
      view2Opts = @FillwidthView.args[1][0]
      view1Opts.fetchOptions['filter[]'].should.equal 'for_sale'
      view2Opts.fetchOptions['filter[]'].should.equal 'not_for_sale'
      view1Opts.collection.url.should.include '/artworks'
      view2Opts.collection.url.should.include '/artworks'

    it 'sets up the blurb view if there is one', ->
      fixture = """
        <div class='artist-info-section'>
          <div class='artist-blurb'>
            <div class='blurb'></div>
          </div>
        </div>
      """
      @view.$el.html fixture
      @view.setupBlurb()
      viewBlurbOpts = @blurbStub.args[0][0]
      viewBlurbOpts.updateOnResize.should.equal true
      viewBlurbOpts.lineCount.should.equal 6

    it 'sets up the related genes view properly', ->
      viewGeneOpts = @genesStub.args[0][0]
      viewGeneOpts.model.should.equal @view.model

    it 'sets up related artists', ->
      @view.relatedArtistsPage.should.equal 2
      @view.relatedContemporaryPage.should.equal 2

    it 'sets up related posts', ->
      viewRelatedPostOpts = @relatedPostStub.args[0][0]
      viewRelatedPostOpts.numToShow.should.equal 2
      viewRelatedPostOpts.model.should.equal @view.model

  describe '#setupRelatedArtists', ->

    it 'renders related artists on sync', ->
      @view.renderRelatedArtists = sinon.stub()
      @view.setupRelatedArtists()
      @view.model.relatedArtists.trigger 'sync'
      @view.renderRelatedArtists.args[0][0].should.equal 'Artists'

  describe '#renderRelatedArtists', ->

    it 'renders related artists', ->
      @view.$el.html "<div id='artist-related-artists'></div>"
      @view.model.relatedArtists.reset [fabricate 'artist', name: 'Andy Foobar']
      @view.renderRelatedArtists 'Artists'
      @view.$el.html().should.include 'Andy Foobar'

    it 'renders related contemporary artists', ->
      @view.$el.html "<div id='artist-related-contemporary'></div>"
      @view.model.relatedContemporary.reset [fabricate 'artist', name: 'Bitty the cat Z']
      @view.renderRelatedArtists 'Contemporary'
      @view.$el.html().should.include 'Bitty the cat Z'

  describe '#renderRelatedArtist', ->

    it 'fetches and renders a single artist row by injecting a fillwidth view', ->
      @view.renderRelatedArtist new Artist(fabricate 'artist', name: 'Andy Foobar'), 0, 'Artists'
      _.last(Backbone.sync.args)[2].success [fabricate 'artwork', title: 'Andy Foobar Skull']
      _.last(@FillwidthView.args)[0].collection.first().get('title').should.equal 'Andy Foobar Skull'
