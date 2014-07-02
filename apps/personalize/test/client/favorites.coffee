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
    sinon.stub Backbone, 'sync'

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
      Backbone.sync.args[0][1].kind.should.equal 'gene'
      Backbone.sync.args[0][1].url().should.include '/api/v1/me/follow/genes'

  describe 'without gene results', ->
    beforeEach ->
      sinon.spy FavoritesView::, 'fetchFallbackArtworks'
      Backbone.sync.args[0][2].success []
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success'

    afterEach ->
      @view.fetchFallbackArtworks.restore()

    describe '#fetchFallbackArtworks', ->
      it 'is called when there is an empty gene response', ->
        @view.fetchFallbackArtworks.called.should.be.true

      it 'sets up some sample artists, then gets some artworks', ->
        @view.fetchFallbackArtworks()
        Backbone.sync.args[0][1].url.should.include '/api/v1/artists/sample'
        success = Backbone.sync.args[0][2].success
        Backbone.sync.restore()
        sinon.stub(Backbone, 'sync').yieldsTo 'success'
        success [(artist = fabricate 'artist')]
        Backbone.sync.args[0][1].url.should.include "/api/v1/artist/#{artist.id}/artworks"

  describe 'with gene results', ->
    beforeEach ->
      Backbone.sync.args[0][2].success [id: 1, kind: 'gene', gene: fabricate('gene')]
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success'

    describe '#fetchArtworks', ->
      beforeEach ->
        @view.genes.add fabricate 'gene'
        @view.fetchArtworks()

      it 'fetches the gene artworks', ->
        Backbone.sync.args[0][1].url.should.include "/api/v1/gene/#{@view.genes.first().id}/artworks"

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
