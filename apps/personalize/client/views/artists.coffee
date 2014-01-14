_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'
StepView        = require './step.coffee'
SearchBarView   = require '../../../../components/main_layout/header/search_bar/view.coffee'
Artist          = require '../../../../models/artist.coffee'
template        = -> require('../../templates/artists.jade') arguments...

followedTemplate          = -> require('../../templates/followed.jade') arguments...
suggestedArtistsTemplate  = -> require('../../templates/suggested_artists.jade') arguments...

FollowArtistCollection  = require '../../../../models/follow_artist_collection.coffee'
FollowButton            = require '../../../artist/client/follow_button.coffee'

{ isTouchDevice } = require '../../../../components/util/device.coffee'

module.exports = class ArtistsView extends StepView
  events:
    'click .personalize-skip' : 'advance'
    'click .pfa-remove'       : 'unfollow'

  initialize: (options) ->
    super

    @followArtistCollection   = new FollowArtistCollection
    @followed                 = new Backbone.Collection [], model: Artist
    @suggestions              = new Backbone.Collection

    @listenTo @followed, 'add', @renderFollowed
    @listenTo @followed, 'add', @fetchRelatedArtists
    @listenTo @followed, 'remove', @renderFollowed
    @listenTo @followed, 'remove', @disposeSuggestionSet
    @listenTo @suggestions, 'add', @renderSuggestions
    @listenTo @suggestions, 'remove', @renderSuggestions

  setupFollowButton: (key, model, el) ->
    @followButtonViews ||= {}
    @followButtonViews[key] ||= new FollowButton
      followArtistCollection: @followArtistCollection
      notes: 'Followed from /personalize'
      model: model
      el: el

  setSkipLabel: ->
    label = if @state.almostDone() then 'Done' else 'Next'
    @$('.personalize-skip').text label
    @_labelSet = true

  # Called when a search result is selected.
  # Follows the selected artist
  follow: (e, artist) ->
    @setSkipLabel() unless @_labelSet?
    @$input.val ''
    @followArtistCollection.follow artist.id, { notes: 'Followed from /personalize' }
    @followed.unshift artist.toJSON() # Re-cast

  # Click handler for unfollow in search dropdown
  unfollow: (e) ->
    id = $(e.currentTarget).data 'id'
    @followed.remove id
    @followArtistCollection.unfollow id

  createSuggestionSet: (artist) ->
    new Backbone.Model
      id:           artist.id
      name:         artist.get 'name'
      suggestions:  artist.relatedArtists

  fetchRelatedArtists: (artist) ->
    artist.fetchRelatedArtists 'Artists',
      success: (model, response) =>
        if response.length > 0 # If there are any suggestions
          @suggestions.unshift @createSuggestionSet artist

  # Removes the corresponding suggestionSet and disposes of
  # its FollowButton views
  #
  # @param {Object}
  disposeSuggestionSet: (model) ->
    suggestionSet = @suggestions.remove model.id
    _.each suggestionSet.get('suggestions').pluck('id'), (id) =>
      key = "#{suggestionSet.id}_#{id}"
      @followButtonViews[key].remove()
      @followButtonViews[key] = null

  renderSuggestions: ->
    (@$suggestions ||= @$('#personalize-artists-suggestions')).
      html suggestedArtistsTemplate suggestions: @suggestions.models

    # Attach FollowButton views
    @suggestions.each (suggestionSet) =>
      suggestionSet.get('suggestions').each (artist) =>
        $button = @$suggestions.
          find(".personalize-suggestions-set[data-id='#{suggestionSet.id}']").
          find(".follow-button[data-id='#{artist.id}']")

        @setupFollowButton "#{suggestionSet.id}_#{artist.id}", artist, $button

  renderFollowed: ->
    @$('#personalize-artists-followed').html followedTemplate(artists: @followed.models)

  render: ->
    @$el.html template(state: @state, isTouchDevice: isTouchDevice())
    @setupSearch()
    this

  setupSearch: ->
    @searchBarView = new SearchBarView
      mode: 'artists'
      el: @$('#personalize-artist-search-container')
      $input: (@$input = @$('#personalize-artist-search'))

    @listenTo @searchBarView, 'search:selected', @follow

  remove: ->
    @searchBarView.remove()
    @suggestions.each (suggestionSet) => @disposeSuggestionSet(suggestionSet)
    super
