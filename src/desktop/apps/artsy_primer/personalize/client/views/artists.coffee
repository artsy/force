_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
StepView = require './step.coffee'
Artist = require '../../../../../models/artist.coffee'
Followable = require '../mixins/followable.coffee'
GeneArtists = require '../mixins/gene_artists.coffee'
Genes = require '../mixins/genes.coffee'
BookmarkedArtists = require '../mixins/bookmarked_artists.coffee'
{ FollowButton, Following } = require '../../../../../components/follow_button/index.coffee'
Artists = require '../../../../../collections/artists.coffee'
mediator = require '../../../../../lib/mediator.coffee'
imagesLoaded = require 'imagesloaded'
template = -> require('../../templates/artists.jade') arguments...
suggestedArtistsTemplate = -> require('../../templates/suggested_artists.jade') arguments...

module.exports = class ArtistsView extends StepView
  _.extend @prototype, Followable
  _.extend @prototype, GeneArtists
  _.extend @prototype, Genes
  _.extend @prototype, BookmarkedArtists

  analyticsUnfollowMessage: 'Unfollowed artist from personalize artist search'
  analyticsFollowMessage: 'Followed artist from personalize artist search'

  suggestedArtistsSetId: '53c55a777261692d45b70100'

  events:
    'click .pfa-remove': 'unfollow'
    'click .artsy-primer-personalize-suggestion': 'followSuggestion'

  initialize: (options) ->
    super

    @following = new Following [], kind: 'artist'
    @suggestions = new Backbone.Collection
    @followed = new Backbone.Collection [], model: Artist

    @listenTo @followed, 'add', @fetchRelatedArtists
    @listenTo @followed, 'remove', @disposeSuggestionSet
    @listenTo @suggestions, 'add', @renderSuggestions
    @listenTo @suggestions, 'remove', @renderSuggestions

  initializeArtistsFromFavorites: ->
    new Backbone.Collection().fetch
      data: sort: '-position', private: true, user_id: @user.id, size: 5
      url: "#{sd.API_URL}/api/v1/collection/saved-artwork/artworks"
      success: (collection, response, options) =>
        artists = new Artists(_.compact(collection.pluck 'artist'))
        if artists.length
          # Auto-follows mean changing the default state of the button to 'Next'
          @setSkipLabel()
          # Follow all artists suggested based on your favorites
          artists.map (artist) => @following.follow artist.id, auto: true
          @suggestions.add new Backbone.Model
            id: 'artists-from-favorites'
            name: 'Artists suggested based on the artworks in your favorites'
            analyticsLabel: 'artist autofollow suggestions'
            suggestions: artists

  initializeSuggestions: ->
    if @user.isCollector() then @initializeBookmarkedArtists() else @initializeGeneArtists()
    @fetchFallbackSuggestions()

  fetchFallbackSuggestions: ->
    setSize = 40
    takeSize = 20
    artists = new Artists
    artists.fetch
      data: size: setSize
      url: "#{sd.API_URL}/api/v1/set/#{@suggestedArtistsSetId}/items"
      success: (collection, response, options) =>
        artists.reset collection.chain().shuffle().first(takeSize).value()
        @suggestions.add new Backbone.Model
          id: 'artist-sample'
          name: 'Artists you may enjoy following'
          analyticsLabel: 'artist fallback suggestions'
          suggestions: artists

  setupFollowButton: (key, model, el) ->
    @followButtonViews ?= {}
    @followButtonViews[key].remove() if @followButtonViews[key]?
    @followButtonViews[key] = new FollowButton
      notes: 'Followed from /personalize'
      context_page: "Personalize page"
      following: @following
      model: model
      modelName: 'artist'
      el: el

  # Delegates to follow button
  followSuggestion: (e) ->
    $(e.currentTarget).find('.follow-button').click()

  createSuggestionSet: (artist) ->
    new Backbone.Model
      id: artist.id
      name: "Artists related to #{artist.get 'name'}"
      analyticsLabel: 'artist related suggestions'
      suggestions: artist.related().artists

  fetchRelatedArtists: (artist) ->
    artist.fetchRelatedArtists 'Artists',
      success: (model, response) =>
        if response.length > 0 # If there are any suggestions
          @suggestions.unshift @createSuggestionSet artist

  # Removes the corresponding suggestionSet and disposes of
  # its FollowButton views
  disposeSuggestionSet: (model) ->
    return unless model?
    if (suggestionSet = @suggestions.remove model.id)
      _.each suggestionSet.get('suggestions').pluck('id'), (id) =>
        key = "#{suggestionSet.id}_#{id}"
        @followButtonViews[key].remove()
        @followButtonViews[key] = null

  renderSuggestions: (suggestionSet) ->
    $suggestionSet = $(suggestedArtistsTemplate(suggestionSet: suggestionSet))
    (@$suggestions ?= @$('#artsy-primer-personalize-suggestions')).prepend $suggestionSet
    @setupFollowButtons suggestionSet
    $suggestionSet.imagesLoaded ->
      $suggestionSet.addClass 'is-fade-in'

  setupFollowButtons: (suggestionSet) ->
    suggestionSet.get('suggestions').each (artist) =>
      $button = @$suggestions.
        find(".artsy-primer-personalize-suggestions-set[data-id='#{suggestionSet.id}']").
        find(".follow-button[data-id='#{artist.id}']")
      button = @setupFollowButton "#{suggestionSet.id}_#{artist.id}", artist, $button
      @listenTo button, 'click', => @setSkipLabel()
    @following.syncFollows suggestionSet.get('suggestions').pluck 'id'

  postRender: ->
    @initializeFollowable()
    @initializeSuggestions()
    @initializeArtistsFromFavorites()

  render: ->
    @$el.html template(user: @user, state: @state, autofocus: @autofocus())
    @setupSearch mode: 'artists'
    @postRender()
    this

  remove: ->
    @typeahead.remove()
    @suggestions.each (suggestionSet) => @disposeSuggestionSet(suggestionSet)
    super
