_                 = require 'underscore'
benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
PersonalizeState  = require '../../client/state'
CurrentUser       = require '../../../../models/current_user.coffee'
Artist            = require '../../../../models/artist.coffee'
{ fabricate }     = require 'antigravity'
{ resolve }       = require 'path'

mockSuggestionSet = (model) ->
  new Backbone.Model
    id:           model.id
    name:         model.name
    suggestions:  new Backbone.Collection new Artist(fabricate 'artist')

describe 'ArtistsView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$    = $
      @ArtistsView  = benv.requireWithJadeify resolve(__dirname, '../../client/views/artists'), ['template', 'suggestedArtistsTemplate']
      @ArtistsView::setupSearch = sinon.stub
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @state  = new PersonalizeState
    @user   = new CurrentUser fabricate 'user'
    @view   = new @ArtistsView(state: @state, user: @user)
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
      @view.suggestions.at(0).get('name').should.equal artist.get('name')

  describe '#disposeSuggestionSet', ->
    it 'disposes of the suggestionSet that corresponds with an artist', ->
      model = fabricate 'artist'
      _.isUndefined(@view.followButtonViews).should.be.ok
      @view.suggestions.add mockSuggestionSet(model)
      suggestionSet   = @view.suggestions.at(0)
      suggested       = suggestionSet.get('suggestions').at(0)
      key             = "#{suggestionSet.id}_#{suggested.id}"
      _.isUndefined(@view.followButtonViews[key]).should.not.be.ok
      @view.disposeSuggestionSet model
      _.isNull(@view.followButtonViews[key]).should.be.ok

  describe '#renderSuggestions', ->
    it 'renders related artists based on following', ->
      model = fabricate 'artist'
      @view.suggestions.add mockSuggestionSet(model)
      @view.renderSuggestions()
      @view.$el.html().should.include "Artists related to #{@view.suggestions.at(0).get('name')}"
      @view.$('.personalize-suggestion-name').text().should.equal @view.suggestions.at(0).get('suggestions').at(0).get('name')

  describe '#render', ->
    it 'renders the template', ->
      @view.$el.html().should.include 'Follow artists you are interested in'
