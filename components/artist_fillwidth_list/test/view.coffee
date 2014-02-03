_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
Artist = require '../../../models/artist'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
ArtistFillwidthList = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template']

ArtistFillwidthList.__set__ 'FillwidthView', class FillwidthView
  render: sinon.stub()
  hideFirstRow: sinon.stub()
  removeHiddenItems: sinon.stub()

describe 'ArtistFillwidthList', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    artists = new Backbone.Collection [fabricate('artist'), fabricate('artist')]
    artists.model = Artist
    @view = new ArtistFillwidthList
      collection: artists
      el: $('body')
      user: new CurrentUser fabricate 'user'
    @view.user.initializeDefaultArtworkCollection()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets up a following collection if passed a user', ->
      @view.following.kind.should.equal 'artist'

  describe '#fetchAndRender', ->

    it 'renders the placeholders', ->
      @view.collection.reset [fabricate 'artist', name: 'Andy Foobar']
      @view.fetchAndRender()
      @view.$el.html().should.include 'Andy Foobar'

  describe '#renderArtist', ->

    it 'fetches the artists artworks and renders a fillwidth view', ->
      @view.renderArtist new Artist fabricate 'artist'
      _.last(Backbone.sync.args)[2].success [fabricate 'artwork']
      FillwidthView::render.called.should.be.ok