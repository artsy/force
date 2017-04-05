{ debounce } = require 'underscore'
{ trim } = require 'underscore.string'
{ API_URL } = require('sharify').data
Q = require 'bluebird-q'
Backbone = require 'backbone'
analyticsHooks = require '../../../../lib/analytics_hooks'
Artist = require '../../../../models/artist'
CurrentUser = require '../../../../models/current_user'
Match = require '../../../../collections/match'
{ Following } = require '../../../../components/follow_button/index'
itemTemplate = -> require('./templates/result.jade') arguments...
resultsTemplate = -> require('./templates/results.jade') arguments...

module.exports = class SearchArtistsView extends Backbone.View
  events:
    'keyup input': 'maybeSearch'
    'click .tt-suggestion-inner' : 'followAndSwap'

  maybeSearch: debounce (-> @search()), 200

  input: ->
    @$input ?= @$('input')

  emptyInput: ->
    trim(@input().val()) == ""

  initialize: ({ @initialSuggestions, @followedArtists, @analyticsMessage }) ->
    @match = new Match
    @match.kind = 'artists'

    @user = CurrentUser.orNull()
    @following = new Following(null, kind: 'artist') if @user

    @listenTo @initialSuggestions, 'add', @renderResults
    @listenTo @match, 'sync reset', @renderResults

    @pastMatches = new Backbone.Collection

    @analyticsMessage ?= 'Homepage followed artists'

    @input().focus()

  renderResults: ->
    suggestions = if @match.models.length then @match.models else @initialSuggestions.models
    @$('.arbv-follow-results').html resultsTemplate
      suggestions: suggestions

  search: ->
    return @match.reset() if @emptyInput()
    @match.fetch data: term: @input().val(), size: 4

  findReplacement: (id, cb) ->
    artists = new Backbone.Collection [], model: Artist
    artists.url = "#{API_URL}/api/v1/me/suggested/artists"
    artists.fetch
      success: cb
      data:
        exclude_followed_artists: true
        artist_id: id
        exclude_artists_without_artworks: true
        size: 1

  findReplacementAndWait: (id) ->
    replacement = new Promise (resolve) => @findReplacement id, resolve
    Q.all [replacement, Q.delay(500)]

  replaceRow: ($el, id, artist) ->
    html = itemTemplate suggestion: artist
    $newRow = $(html).find('.tt-suggestion-inner').css 'display', 'none'
    $el.parent().append $newRow
    $el.fadeOut =>
      $el.next().fadeIn 500, -> $el.remove()
      @appendName id

  removeRow: ($el, id) ->
    $el.parent().fadeOut =>
      $el.parent().remove()
      @appendName id

  appendName: (id) ->
    followed = @match.get(id) or @initialSuggestions.get(id) or @pastMatches.get(id)
    @followedArtists.unshift followed

  followAndSwap: (e) ->
    e.preventDefault()
    $suggestion = $(e.currentTarget)
    slug = $suggestion.data('artist-slug')
    id = $suggestion.data('artist-id')
    @following.follow(id) if @user
    $suggestion.find('.typeahead-suggestion-follow').attr 'data-state', 'following'
    analyticsHooks.trigger 'followable:followed',  {
      modelName: @match.kind
      entity_slug: slug
      entity_id: id
      context_module: @analyticsMessage
    }
    $suggestion.addClass 'tt-suggestion-inner__selected'
    @$('input').select()
    @findReplacementAndWait(id).then ([ artists ]) =>
      if artists.length
        @replaceRow($suggestion, id, artists.first())
        @pastMatches.add artists.first()
      else
        @removeRow $suggestion, id

