_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
PersonalizeState = require '../../client/state'
CurrentUser = require '../../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
FavoritesView = benv.requireWithJadeify resolve(__dirname, '../../client/views/favorites'), ['template']
FavoritesView.__set__ 'ArtworkColumnsView', Backbone.View

describe 'FavoritesView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub(Backbone, 'sync').yieldsTo 'success'

    @user = new CurrentUser fabricate 'user', collector_level: 2
    @state = new PersonalizeState user: @user
    @view = new FavoritesView state: @state, user: @user

    @view.render()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.$el.html().should.include 'Add works to your favorites'
      @view.$('#personalize-favorites-container').length.should.equal 1

  describe '#initialize', ->
    it 'initializes the followed genes', ->
      _.first(Backbone.sync.args)[0].should.equal 'read'
      _.first(Backbone.sync.args)[1].kind.should.equal 'gene'
      _.first(Backbone.sync.args)[1].url().should.include '/api/v1/me/follow/genes'

  describe '#fetchArtworks', ->
    beforeEach ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success'
      @view.genes.add fabricate 'gene'
      @view.fetchArtworks()

    it 'fetches the gene artworks', ->
      _.first(Backbone.sync.args)[0].should.equal 'read'
      _.first(Backbone.sync.args)[1].url.should.include "/api/v1/gene/#{@view.genes.first().id}/artworks"

  describe '#setupFavorites', ->
    it 'sets up the favorites collection', ->
      _.isUndefined(@view.favorites).should.be.false

    describe 'fetched', ->
      beforeEach ->
        @view.artworks.add fabricate('artwork')
        @view.favorites.saveArtwork(@view.artworks.first().id)
        @view.favorites.trigger 'artworksFetched'

      it 'should extract artists from the favorited artworks', ->
        @view.user.artistsFromFavorites.first().get('name').should.equal 'Andy Warhol'
