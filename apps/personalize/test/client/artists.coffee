_                 = require 'underscore'
benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
PersonalizeState  = require '../../client/state'
CurrentUser       = require '../../../../models/current_user.coffee'
Artist            = require '../../../../models/artist.coffee'
{ fabricate }     = require 'antigravity'
{ resolve }       = require 'path'
ArtistsView       = benv.requireWithJadeify resolve(__dirname, '../../client/views/artists'), ['template', 'suggestedArtistsTemplate']

describe 'ArtistsView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      ArtistsView::setupSearch = sinon.stub
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @user   = new CurrentUser fabricate 'user'
    @state  = new PersonalizeState user: @user
    @view   = new ArtistsView(state: @state, user: @user)
    @view.render()

  afterEach ->
    Backbone.sync.restore()

  describe '#setupFollowButton', ->
    it 'sets up a FollowButton view that can be accessed later', ->
      artist  = new Artist fabricate 'artist'
      key     = _.uniqueId(artist.id)
      view    = @view.setupFollowButton key, artist, $('<div></div>')
      view.constructor.name.should.equal 'FollowButton'
      @view.followButtonViews[key].should.equal view

  describe '#fetchRelatedArtists', ->
    it 'fetches related artists', ->
      artist        = new Artist(fabricate 'artist')
      suggestions   = [fabricate('artist'), fabricate('artist')]
      sinon.stub(artist, 'fetchRelatedArtists').yieldsTo('success', {}, suggestions)
      @view.fetchRelatedArtists artist
      artist.fetchRelatedArtists.called.should.be.ok
      @view.suggestions.at(0).id.should.equal artist.id
      @view.suggestions.at(0).get('name').should.equal "Artists related to #{artist.get('name')}"

  describe '#disposeSuggestionSet', ->
    it 'disposes of the suggestionSet that corresponds with an artist', ->
      artist = new Artist(fabricate 'artist')
      artist.relatedArtists = new Backbone.Collection artist
      _.isUndefined(@view.followButtonViews).should.be.ok
      @view.suggestions.add @view.createSuggestionSet(artist)
      suggestionSet   = @view.suggestions.at(0)
      suggested       = suggestionSet.get('suggestions').at(0)
      key             = "#{suggestionSet.id}_#{suggested.id}"
      _.isUndefined(@view.followButtonViews[key]).should.not.be.ok
      @view.disposeSuggestionSet artist
      _.isNull(@view.followButtonViews[key]).should.be.ok

  describe '#renderSuggestions', ->
    it 'renders related artists based on following', ->
      artist = new Artist(fabricate 'artist')
      artist.relatedArtists = new Backbone.Collection artist
      @view.suggestions.add @view.createSuggestionSet(artist)
      @view.renderSuggestions()
      @view.$el.html().should.include @view.suggestions.at(0).get('name')
      @view.$('.personalize-suggestion-name').text().should.equal @view.suggestions.at(0).get('suggestions').at(0).get('name')

  describe '#render', ->
    it 'renders the template', ->
      @view.$el.html().should.include 'Follow artists you are interested in'

  describe 'GeneArtists', ->
    describe '#initializeGeneArtists', ->
      it 'fetches your followed genes', ->
        Backbone.sync.args[0][0].should.equal 'read'
        Backbone.sync.args[0][1].kind.should.equal 'gene'
        Backbone.sync.args[0][1].url().should.include 'api/v1/me/follow/genes'

    describe '#setupGenes', ->
      it 'sets up the genes and fetches the trending artists for each', ->
        followGene = id: _.uniqueId('gene'), gene: fabricate 'gene'
        Backbone.sync.args[0][2].success([followGene])
        @view.genes.length.should.equal 1
        Backbone.sync.args[1][1].url.should.include "api/v1/artists/trending?gene=#{followGene.gene.id}"

    describe '#renderGeneSuggestions', ->
      it 'creates a suggestionSet and calls out to #renderSuggestions', ->
        followGene = id: _.uniqueId('gene'), gene: fabricate 'gene'
        Backbone.sync.args[0][2].success([followGene])
        @view.renderGeneSuggestions()
        @view.$el.html().should.include 'Suggested for you in Pop Art'
