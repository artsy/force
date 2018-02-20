_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
PersonalizeState = require '../../client/state'
CurrentUser = require '../../../../../models/current_user.coffee'
Artist = require '../../../../../models/artist.coffee'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'ArtistsView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @ArtistsView = benv.requireWithJadeify resolve(__dirname, '../../client/views/artists'), ['template', 'suggestedArtistsTemplate']
    @ArtistsView.__set__ 'imagesLoaded', (cb) -> cb()
    sinon.stub Backbone, 'sync'
    sinon.stub @ArtistsView::, 'setupSearch'
    sinon.spy @ArtistsView::, 'initializeBookmarkedArtists'
    $.fn.imagesLoaded = (cb) -> cb()

    @user = new CurrentUser fabricate 'user', collector_level: 2
    @state = new PersonalizeState user: @user
    @view = new @ArtistsView state: @state, user: @user

    @view.render()

  afterEach ->
    Backbone.sync.restore()
    @view.setupSearch.restore()
    @view.initializeBookmarkedArtists.restore()

  describe 'fallback artists', ->
    beforeEach ->
      @view.initializeGeneArtists = -> then: (fn) -> fn []
      @view.initializeSuggestions()

    it 'fetches the fallback artists when we fail to come up with suggestions', ->
      _.last(Backbone.sync.args)[2].url.should.containEql '/api/v1/set/53c55a777261692d45b70100/items'

    it 'renders four rows of results', ->
      _.last(Backbone.sync.args)[2].success _.times(40, -> fabricate 'artist')
      @view.$('.artsy-primer-personalize-suggestion').length.should.equal 20
      @view.$el.html().should.containEql 'Artists you may enjoy following'

  describe '#initializeArtistsFromFavorites', ->
    beforeEach ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success', [
        fabricate('artwork', artist: fabricate('artist'))
        fabricate('artwork', artist: null)
        fabricate('artwork', artist: fabricate('artist'))
      ]
      @view.initializeArtistsFromFavorites()

    it 'fetches your recently favorited artworks', ->
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/collection/saved-artwork/artworks'

    it 'adds a suggestion set if the user has favorited some artworks in the previous step', ->
      @view.$el.html().should.containEql 'Artists suggested based on the artworks in your favorites'
      @view.$('.artsy-primer-personalize-suggestion').length.should.equal 2

    it 'sets the skip button state to "Next" if there are artists to auto-follow'

  describe '#setupFollowButton', ->
    it 'sets up a FollowButton view that can be accessed later', ->
      artist = new Artist fabricate 'artist'
      key = _.uniqueId(artist.id)
      view = @view.setupFollowButton key, artist, $('<div></div>')
      view.constructor.name.should.equal 'FollowButton'
      @view.followButtonViews[key].should.equal view

  describe '#fetchRelatedArtists', ->
    it 'fetches related artists', ->
      artist = new Artist(fabricate 'artist')
      suggestions = [fabricate('artist'), fabricate('artist')]
      sinon.stub(artist.related().artists, 'fetch').yieldsTo('success', {}, suggestions)
      @view.fetchRelatedArtists artist
      artist.related().artists.fetch.called.should.be.ok()
      @view.suggestions.at(0).id.should.equal artist.id
      @view.suggestions.at(0).get('name').should.equal "Artists related to #{artist.get('name')}"

  describe '#disposeSuggestionSet', ->
    it 'disposes of the suggestionSet that corresponds with an artist', ->
      artist = new Artist(fabricate 'artist')
      artist.related().artists = new Backbone.Collection artist
      _.isUndefined(@view.followButtonViews).should.be.ok()
      @view.suggestions.add @view.createSuggestionSet(artist)
      suggestionSet = @view.suggestions.at(0)
      suggested = suggestionSet.get('suggestions').at(0)
      key = "#{suggestionSet.id}_#{suggested.id}"
      _.isUndefined(@view.followButtonViews[key]).should.not.be.ok()
      @view.disposeSuggestionSet artist
      _.isNull(@view.followButtonViews[key]).should.be.ok()

    it 'guards against cases where an undefined is passed in (?)', (done) ->
      @view.disposeSuggestionSet undefined
      done()

  describe '#renderSuggestions', ->
    it 'renders related artists based on following', ->
      artist = new Artist(fabricate 'artist')
      artist.related().artists = new Backbone.Collection artist
      suggestionSet = @view.createSuggestionSet(artist)
      @view.renderSuggestions suggestionSet
      @view.$el.html().should.containEql suggestionSet.get('name')
      @view.$('.artsy-primer-personalize-suggestion-name').text().should.equal suggestionSet.get('suggestions').at(0).get('name')

  describe '#render', ->
    describe 'collector_level 2', ->
      it 'renders the template with the correct copy', ->
        @view.$el.html().should.containEql 'Follow artists you are interested in'

  describe 'GeneArtists', ->
    describe '#initializeGeneArtists', ->
      it 'fetches your followed genes', ->
        Backbone.sync.args[0][0].should.equal 'read'
        Backbone.sync.args[0][1].kind.should.equal 'gene'
        Backbone.sync.args[0][1].url().should.containEql 'api/v1/me/follow/genes'

    describe '#setupGenes', ->
      it 'sets up the genes and fetches the trending artists for each', ->
        followGene = id: _.uniqueId('gene'), gene: fabricate 'gene'
        Backbone.sync.args[0][2].success([followGene])
        @view.genes.length.should.equal 1
        _.last(Backbone.sync.args)[1].url.should.containEql "api/v1/artists/trending?gene=#{followGene.gene.id}"

    describe '#renderGeneSuggestions', ->
      it 'creates a suggestionSet and calls out to #renderSuggestions', ->
        followGene = id: _.uniqueId('gene'), gene: fabricate 'gene'
        Backbone.sync.args[0][2].success([followGene])
        @view.renderGeneSuggestions()
        @view.$el.html().should.containEql 'Suggested for you in Pop Art'

  describe 'BookmarkArtists', ->
    describe 'collector_level 2', ->
      it 'does not initialize bookmark artists', ->
        @user.set 'collector_level', 2
        view = new @ArtistsView state: @state, user: @user
        view.initializeBookmarkedArtists.called.should.be.false()

    describe 'collector_level 3', ->
      beforeEach ->
        Backbone.sync.restore()
        sinon.stub Backbone, 'sync'
        @user.set 'collector_level', 3
        @view = new @ArtistsView state: @state, user: @user
        @view.render()

      it 'is initializes the bookmark artists', ->
        @view.initializeBookmarkedArtists.called.should.be.true()

      it 'fetches the bookmarks collection', ->
        Backbone.sync.args[0][1].url
          .should.containEql '/api/v1/me/user_interests'
