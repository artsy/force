_ = require 'underscore'
Backbone = require 'backbone'
{ PartnerArtists } = require '../../../collections/partner_artists'
ArtistView = require './artists_artist.coffee'
ArtistsListView = require './artists_list.coffee'
template = -> require('../templates/artists.jade') arguments...

module.exports = class PartnerArtistsView extends Backbone.View

  defaults:
    artistsListColumnSize: 6
    nextPage: 1
    pageSize: 3
    artistId: undefined

  initialize: (options={}) ->
    { @profile, @partner, @artistsListColumnSize, @nextPage, @pageSize, @artistId } =
      _.defaults options, @defaults
    @distinguishRepresentedArtists = @partner.get('distinguish_represented_artists') != false # default to true
    @cache = options.cache; artists = @cache?.artists
    @collection = if artists? then artists else new PartnerArtists()
    @fetchAllArtists()
    @render()

  render: ->
    @$el.html template(); return if @collection.length is 0

    @displayables = @collection.filter (pa) ->
      # Display represented artists or non- ones with published artworks
      pa.get('represented_by') or
      pa.get('published_artworks_count') > 0

    @renderArtistsList()
    if @artistId? then @renderArtist()
    else
      if @displayables.length > @pageSize
        $(window).on 'scroll.artists.partner', _.throttle(@infiniteScroll, 150)
      @renderNextPageOfArtists()

  cacheArtists: -> @cache.artists = @collection

  fetchAllArtists: ->
    return unless @collection.length is 0

    @collection.url = "#{@partner.url()}/partner_artists?display_on_partner_profile=1"
    @collection.fetchUntilEndInParallel success: => @cacheArtists(); @render()

  renderArtistsList: ->
    new ArtistsListView
      collection: @displayables
      el: @$('#artists-list')
      distinguishRepresentedArtists: @distinguishRepresentedArtists

  appendArtist: (partnerArtist, scroll=false, allArtworks=false) ->
    a = partnerArtist.get('artist')
    $artistInList = @$(".partner-artists-list li[data-artist-id='#{a.id}'] > a")
    new ArtistView
      model: partnerArtist
      scroll: scroll
      allArtworks: allArtworks
      noArtworks: ->
        @$el.remove(); $artistInList.replaceWith "<span class='artist-name'>#{a.name}</span>"
      el: $('<div>').appendTo @$('#artists-details')

  renderArtist: ->
    pa = _.find @displayables, (pa) => pa.get('artist').id is @artistId
    @appendArtist pa, true, true if pa?

  renderNextPageOfArtists: ->
    end = @pageSize * @nextPage; start = end - @pageSize
    for pa in @displayables.slice start, end
      @appendArtist pa if pa.get('published_artworks_count') > 0

    ++@nextPage
    if end >= @displayables.length then $(window).off 'scroll.artists'

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('#artists-details .partner-artist:last')
    @renderNextPageOfArtists() unless fold < $lastItem.offset()?.top + $lastItem.height()
