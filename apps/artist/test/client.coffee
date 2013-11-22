_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Artist = require '../../../models/artist'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'ArtistView', ->

  before (done) ->
    sinon.stub _, 'defer'
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    benv.render '../templates/index.jade', {
      sd: {}
      artist: new Artist fabricate 'artist'
    }, =>
      { ArtistView, @init } = mod = benv.requireWithJadeify(
        (resolve __dirname, '../client/index'), ['relatedArtistsTemplate']
      )
      @FillwidthView = sinon.stub()
      @FillwidthView.nextPage = sinon.stub()
      @FillwidthView.render = sinon.stub()
      @FillwidthView.returns @FillwidthView
      mod.__set__ 'FillwidthView', @FillwidthView
      mod.__set__ 'BlurbView', @blurbStub = sinon.stub()
      @view = new ArtistView
        el: $ 'body'
        model: new Artist fabricate 'artist'
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets up fillwidth views with collections pointing to for sale and not for sale works', ->
      view1Opts = @FillwidthView.args[0][0]
      view2Opts = @FillwidthView.args[1][0]
      view1Opts.fetchOptions['filter[]'].should.equal 'for_sale'
      view2Opts.fetchOptions['filter[]'].should.equal 'not_for_sale'
      view1Opts.collection.url.should.include '/artworks'
      view2Opts.collection.url.should.include '/artworks'

    it 'sets up the blurb view if there is one', ->
      viewBlurbOpts = @blurbStub.args[0][0]
      viewBlurbOpts.updateOnResize.should.equal true
      viewBlurbOpts.lineCount.should.equal 6
      @view.$el.html().should.include @view.model.get('blurb')

    it 'sets up related artists', ->
      @view.relatedArtistsPage.should.equal 2
      @view.relatedContemporaryPage.should.equal 2

  describe '#setupRelatedArtists', ->

    it 'renders related artists on sync', ->
      @view.renderRelatedArtists = sinon.stub()
      @view.setupRelatedArtists()
      @view.model.relatedArtists.trigger 'sync'
      @view.renderRelatedArtists.args[0][0].should.equal 'Artists'

  describe '#renderRelatedArtists', ->

    it 'renders related artists', ->
      @view.model.relatedArtists.reset [fabricate 'artist', name: 'Andy Foobar']
      @view.renderRelatedArtists 'Artists'
      @view.$el.html().should.include 'Andy Foobar'

  describe '#renderRelatedArtist', ->

    it 'fetches and renders a single artist row by injecting a fillwidth view', ->
      @view.renderRelatedArtist new Artist(fabricate 'artist', name: 'Andy Foobar'), 0, 'Artists'
      _.last(Backbone.sync.args)[2].success [fabricate 'artwork', title: 'Andy Foobar Skull']
      _.last(@FillwidthView.args)[0].collection.first().get('title').should.equal 'Andy Foobar Skull'