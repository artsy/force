_ = require 'underscore'
Backbone = require 'backbone'
Popover = require 'popover'
{ API_URL } = require('sharify').data
listTemplate = -> require('./artist_suggestions.jade') arguments...
rowTemplate = -> require('./artist_suggestion.jade') arguments...

module.exports = class ArtistSuggestions extends Backbone.View
  
  initialize: (options) ->
    { @following } = options

  # Follow the artist, and if there are any remaining swap the next one in
  followAndMaybeSwap: (e) =>
    e.preventDefault()
    id = $(e.currentTarget).data('artist-id')
    @following.follow id
    $oldLi = $(e.currentTarget).parent('li')
    $oldLi.find('a').attr 'data-state', 'following'
    $oldLi.find('a').off 'click'
    return unless (nextArtist = @remainingArtists?.shift())
    $newLi = $(rowTemplate artist: nextArtist)
    $oldLi.fadeOut =>
      $oldLi.replaceWith($newLi)
      $oldLi.fadeIn()
      # re-bind follow event
      @$popoverEl.find(@followButtonSelector(nextArtist.get('id'))).on 'click', @followAndMaybeSwap

  remove: =>
    @popover.remove()

  followButtonSelector: (artistId) ->
    "a[data-artist-id='#{artistId}']"

  renderSuggestedArtists: ->
    @model.related().artists.url = "#{API_URL}/api/v1/me/suggested/artists"

    @model.related().artists.fetch
      data:
        exclude_followed_artists: true
        artist_id: @model.get('id')
        exclude_artists_without_artworks: true
      success: =>
        return unless @model.related().artists.length > 0
        @initialArtists = @model.related().artists.models[0...3]
        @remainingArtists = @model.related().artists.models[3...-1] if @model.related().artists.length > 3
        html = listTemplate
          artists: @initialArtists
        position = @bestPosition(@$el[0])
        @popover = new Popover
          button: @$el[0]
          position: position  # 'bottom' or 'top' depending on what will be in view
          className: 'artist-suggestion-popover'
        @popover.setContent(html).render()
        @$popoverEl = $(@popover.el)
        @bindPopoverEvents()

  # Pick the bottom if the popover will be in view, otherwise top
  bestPosition: (el) ->
    bottomOfViewport = $(window).scrollTop() + $(window).height()
    bottomOfPopoverEl = $(el).offset().top + $(el).outerHeight() + 225
    if bottomOfPopoverEl > bottomOfViewport
      'top'
    else
      'bottom'

  bindPopoverEvents: ->
    @$popoverEl.find('.popover-close').on 'click', @remove
    @$popoverEl.find('.follow-button').on 'click', @followAndMaybeSwap
