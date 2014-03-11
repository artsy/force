_                   = require 'underscore'
sd                  = require('sharify').data
Backbone            = require 'backbone'
StepView            = require './step.coffee'
Artist              = require '../../../../models/artist.coffee'
Followable          = require '../mixins/followable.coffee'
FollowCollection    = require '../../../../models/follow_artist_collection.coffee'
FollowButton        = require '../../../artist/client/follow_button.coffee'
{ isTouchDevice }   = require '../../../../components/util/device.coffee'

template                  = -> require('../../templates/artists.jade') arguments...
suggestedArtistsTemplate  = -> require('../../templates/suggested_artists.jade') arguments...

module.exports = class ArtistsView extends StepView
  _.extend @prototype, Followable

  analyticsUnfollowMessage: 'Unfollowed artist from personalize artist search'
  analyticsFollowMessage:   'Followed artist from personalize artist search'

  events:
    'click .personalize-skip' : 'advance'
    'click .pfa-remove'       : 'unfollow'

  initialize: (options) ->
    super

    @following    = new FollowCollection
    @suggestions  = new Backbone.Collection

    @followed = new Backbone.Collection [], model: Artist
    @initializeFollowable()

    @listenTo @followed, 'add', @fetchRelatedArtists
    @listenTo @followed, 'remove', @disposeSuggestionSet
    @listenTo @suggestions, 'add', @renderSuggestions
    @listenTo @suggestions, 'remove', @renderSuggestions

  setupFollowButton: (key, model, el) ->
    @followButtonViews ||= {}
    @followButtonViews[key].remove() if @followButtonViews[key]?
    @followButtonViews[key] = new FollowButton
      analyticsUnfollowMessage: 'Unfollowed artist from personalize artist suggestions'
      analyticsFollowMessage:   'Followed artist from personalize artist suggestions'
      notes:                    'Followed from /personalize'
      modelName:                'artist'
      followArtistCollection:   @following
      model:                    model
      el:                       el

  createSuggestionSet: (artist) ->
    new Backbone.Model
      id:           artist.id
      name:         artist.get 'name'
      suggestions:  artist.relatedArtists

  fetchRelatedArtists: (artist) ->
    artist.fetchRelatedArtists 'Artists',
      success: (model, response) =>
        if response.length > 0 # If there are any suggestions
          @suggestions.add @createSuggestionSet artist

  # Removes the corresponding suggestionSet and disposes of
  # its FollowButton views
  disposeSuggestionSet: (model) ->
    suggestionSet = @suggestions.remove model.id
    _.each suggestionSet.get('suggestions').pluck('id'), (id) =>
      key = "#{suggestionSet.id}_#{id}"
      @followButtonViews[key].remove()
      @followButtonViews[key] = null

  renderSuggestions: ->
    (@$suggestions ||= @$('#personalize-suggestions')).
      html suggestedArtistsTemplate suggestions: @suggestions.models

    # Attach FollowButton views
    @suggestions.each (suggestionSet) =>
      suggestionSet.get('suggestions').each (artist) =>
        $button = @$suggestions.
          find(".personalize-suggestions-set[data-id='#{suggestionSet.id}']").
          find(".follow-button[data-id='#{artist.id}']")

        @setupFollowButton "#{suggestionSet.id}_#{artist.id}", artist, $button

  render: ->
    @$el.html template(state: @state, isTouchDevice: isTouchDevice())
    @setupSearch { mode: 'artists' }
    this

  remove: ->
    @searchBarView.remove()
    @suggestions.each (suggestionSet) => @disposeSuggestionSet(suggestionSet)
    super
