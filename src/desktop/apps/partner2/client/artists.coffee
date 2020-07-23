_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
Partner = require '../../../models/partner.coffee'
Artist = require '../../../models/artist.coffee'
PartnerArtists = require '../../../collections/partner_artists.coffee'
ArtistView = require './artists_artist.coffee'
ArtistsListView = require '../components/artists_list/view.coffee'
require '../../../../lib/promiseDone'
template = -> require('../templates/artists.jade') arguments...

module.exports = class PartnerArtistsView extends Backbone.View

  defaults:
    artistsListColumnSize: 6
    nextPage: 1
    pageSize: 3
    artistId: undefined
    cache: {}

  initialize: (options = {}) ->
    { @profile, @partner, @artistsListColumnSize, @nextPage, @pageSize,
      @artistId, @cache } = _.defaults options, @defaults
    # @collection is all displayable partner artists.
    @collection = @cache.artists or new PartnerArtists()
    @startUp()

  startUp: ->
    @render()
    @initializeArtistsList().then(@initializeArtistOrArtists).done()

  render: -> @$el.html template()

  initializeArtistsList: ->
    artistsListView = new ArtistsListView
      partner: @partner
      collection: @collection
      el: @$('#artists-list')

    artistsListView.fetch()
      .then @interceptPartnerArtists
      .then artistsListView.render

  # The ArtistsListView fetches all displayable partner artists. We intercept
  # the fetched partner artists and cache them.
  interceptPartnerArtists: (displayables) =>
    @collection.reset displayables
    @cache.artists = @collection
    displayables

  initializeArtistOrArtists: =>
    if @artistId? then @renderArtist() else @infiniteScrollingArtists()

  renderArtist: ->
    partnerArtist = @collection.find (pa) => pa.get('artist').id is @artistId
    @appendArtist(partnerArtist, true, true) if partnerArtist?

  appendArtist: (partnerArtist, scroll = false, allArtworks = false) ->
    a = partnerArtist.get('artist')
    $artistInList = @$(".partner2-artists-list li[data-artist-id='#{a.id}'] > a")
    new ArtistView
      model: partnerArtist
      scroll: scroll
      allArtworks: allArtworks
      noArtworks: ->
        @$el.remove(); $artistInList.replaceWith "<span class='artist-name'>#{a.name}</span>"
      el: $('<div class="partner-artist-container">').appendTo @$('#artists-details')

  infiniteScrollingArtists: ->
    if @collection.length > @pageSize
      $(window).on 'scroll.artists.partner', _.throttle(@infiniteScroll, 150)
    @renderNextPageOfArtists()

  renderNextPageOfArtists: ->
    end = @pageSize * @nextPage; start = end - @pageSize
    for pa in @collection.slice start, end
      @appendArtist pa if pa.get('published_artworks_count') > 0

    ++@nextPage
    if end >= @collection.length then $(window).off 'scroll.artists'

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('#artists-details .partner2-artist:last')
    @renderNextPageOfArtists() unless fold < $lastItem.offset()?.top + $lastItem.height()
