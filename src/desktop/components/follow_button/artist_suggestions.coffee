_ = require 'underscore'
Backbone = require 'backbone'
Popover = require 'popover'
{ API_URL } = require('sharify').data
listTemplate = -> require('./artist_suggestions.jade') arguments...
rowTemplate = -> require('./artist_suggestion.jade') arguments...
Artist = require '../../models/artist'

module.exports = class ArtistSuggestions extends Backbone.View

  initialize: (options) ->
    { @following, @context_page } = options

  # Follow the artist, and if there are any remaining swap the next one in
  followAndMaybeSwap: (e) =>
    e.preventDefault()
    id = $(e.currentTarget).data('artist-slug')
    _id = $(e.currentTarget).data('artist-id')
    @following.follow id
    window.analytics.track("Followed Artist", {
      entity_slug: id,
      entity_id: _id,
      context_page: @context_page,
      context_module: "follow-widget",
    })
    $li = $(e.currentTarget).parent().parent('li')
    $li.find('.follow-button').attr 'data-state', 'following'
    return unless (nextArtist = @remainingArtists?.shift())
    _.delay (=> @replaceTextAndFade($li, nextArtist)), 500   # give a bit of time to see the 'Following' message

  replaceTextAndFade: ($li, artist) ->
    html = rowTemplate artist: artist
    $li.find('.artist-suggestion-row').replaceWith html
    $newRow = $li.find('.artist-suggestion-row')
    $newRow.css 'opacity', 0
    $newRow.fadeTo('slow', 1)
    @$popoverEl.find(@followButtonSelector(artist.get('id'))).on 'click', @followAndMaybeSwap

  remove: =>
    window.analytics.track("Dismiss follow widget")
    @popover.remove()

  followButtonSelector: (artistId) ->
    "a[data-artist-slug='#{artistId}']"

  renderSuggestedArtists: ->
    artists = new Backbone.Collection [], model: Artist
    artists.url = "#{API_URL}/api/v1/me/suggested/artists"
    artists.fetch
      data:
        exclude_followed_artists: true
        artist_id: @model.id
        exclude_artists_without_artworks: true
      success: =>
        return unless artists.length > 3
        window.analytics.track("Show follow widget")
        @initialArtists = artists.models[0...3]
        @remainingArtists = artists.models[3...-1]
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

  trackArtistClick: (e) ->
    window.analytics.track("Clicked artist name on follow widget")

  bindPopoverEvents: ->
    @$popoverEl.find('.popover-close').on 'click', @remove
    @$popoverEl.find('.follow-button').on 'click', @followAndMaybeSwap
    @$popoverEl.find('.artist-suggestion-name').on 'click', @trackArtistClick

