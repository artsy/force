{ debounce, delay } = require 'underscore'
{ trim } = require 'underscore.string'
{ API_URL } = require('sharify').data
Q = require 'bluebird-q'
Backbone = require 'backbone'
Artist = require '../../../../models/artist.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
Match = require '../../../../collections/match.coffee'
{ Following } = require '../../../../components/follow_button/index.coffee'
itemTemplate = -> require('./templates/result.jade') arguments...
resultsTemplate = -> require('./templates/results.jade') arguments...

module.exports = class SearchArtistsView extends Backbone.View
  events:
    'keyup input': 'maybeSearch'
    'click .tt-suggestion' : 'followAndSwap'

  maybeSearch: debounce (-> @search()), 200

  input: ->
    @$input ?= @$('input')

  emptyInput: ->
    trim(@input().val()) == ""

  initialize: ({ @initialSuggestions, @followedArtists }) ->
    @match = new Match
    @match.kind = 'artists'

    @user = CurrentUser.orNull()
    @following = new Following(null, kind: 'artist') if @user

    @listenTo @initialSuggestions, 'add', @renderResults
    @listenTo @match, 'sync reset', @renderResults

    @pastMatches = new Backbone.Collection

    @delegateEvents()

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
    replacementDeferred = Q.defer()
    waitDeferred = Q.defer()

    @findReplacement id, (artist) -> replacementDeferred.resolve(artist)
    setTimeout ( -> waitDeferred.resolve() ), 500

    Q.all [replacementDeferred.promise, waitDeferred.promise]

  replaceRow: ($el, id, artist) ->
    html = itemTemplate suggestion: artist
    $el.find('.tt-suggestion-inner').fadeOut 'slow', =>
      $el.replaceWith html

  followAndSwap: (e) ->
    e.preventDefault()
    $suggestion = $(e.currentTarget)
    id = $suggestion.data('artist-id')
    # @following.follow id
    $suggestion.find('.typeahead-suggestion-follow').attr 'data-state', 'following'
    @findReplacementAndWait(id).then ([ artists ]) =>
      if artists.length
        @replaceRow($suggestion, id, artists.first())
        @pastMatches.add artists.first()
      followed = @match.get(id) || @initialSuggestions.get(id) || @pastMatches.get(id)
      @followedArtists.unshift followed

