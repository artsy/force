_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
Artist = require '../../../models/artist'
{ fabricate } = require '@artsy/antigravity'
{ resolve } = require 'path'
ArtistFillwidthList = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['mainTemplate', 'listTemplate']

ArtistFillwidthList.__set__ 'FillwidthView', class FillwidthView
  render: sinon.stub()
  hideSecondRow: sinon.stub()
  removeHiddenItems: sinon.stub()

describe 'ArtistFillwidthList', ->

  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        sd: {}
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
      @view.$el.html().should.containEql 'Andy Foobar'

  describe '#renderArtist', ->

    it 'fetches the artists artworks and renders a fillwidth view', ->
      @view.renderArtist new Artist fabricate 'artist'
      _.last(Backbone.sync.args)[2].success [fabricate 'artwork']
      FillwidthView::render.called.should.be.ok()

  describe '#appendPage', ->

    it 'adds a list of artists', ->
      @view.appendPage [], [fabricate 'artist', name: 'Andy Foobazio']
      @view.$el.html().should.containEql 'Andy Foobazio'

  describe '#nextPage', ->

    it 'fetches the next page of artists', ->
      @view.page = 1
      @view.nextPage()
      _.last(Backbone.sync.args)[2].data.page.should.equal 2

  describe '#syncFollowsOnAjaxStop', ->

    it 'syncs follows after ajax stop', ->
      @view.following = { syncFollows: sinon.stub() }
      @view.$document = $ "<div>"
      @view.syncFollowsOnAjaxStop()
      @view.$document.trigger 'ajaxStop'
      @view.following.syncFollows.called.should.be.ok()
