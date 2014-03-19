_              = require 'underscore'
sd             = require('sharify').data
Backbone       = require 'backbone'
CurrentUser    = require '../../../models/current_user.coffee'
Partner        = require '../../../models/partner.coffee'
Artist         = require '../../../models/artist.coffee'
PartnerArtists = require '../../../collections/partner_artists.coffee'
ArtistView     = require './artists_artist.coffee'
ArtistsListView = require './artists_list.coffee'
template       = -> require('../templates/artists.jade') arguments...

module.exports = class PartnerArtistsView extends Backbone.View

  defaults:
    artistsListColumnSize: 6
    nextPage: 1
    pageSize: 3
    artistId: undefined

  initialize: (options={}) ->
    { @profile, @partner, @artistsListColumnSize, @nextPage, @pageSize, @artistId } =
      _.defaults options, @defaults
    @collection ?= new PartnerArtists()
    @initializeArtists()
    @render()

  render: ->
    @$el.html $( template() )

  initializeArtists: ->
    @collection.url = "#{@partner.url()}/partner_artists"
    @collection.fetchUntilEnd
      cache: true
      success: =>
        @displayables = @collection.filter (pa) ->
          # Display represented artists or non- ones with published artworks
          pa.get('represented_by') or
          pa.get('published_artworks_count') > 0
        @renderArtistsList()
        if @artistId? then @renderArtist()
        else
          if @displayables.length > @pageSize
            $(window).on 'scroll.partner_artists', _.throttle(@infiniteScroll, 150)
          @renderNextPageOfArtists()

  renderArtistsList: ->
    new ArtistsListView
      collection: @displayables
      el: @$('#artists-list')

  appendArtist: (partnerArtist, scroll=false) ->
    a = partnerArtist.get('artist')
    $artistInList = @$(".partner-artists-list li[data-artist-id='#{a.id}'] > a")
    new ArtistView
      model: partnerArtist
      scroll: scroll
      noArtworks: ->
        @$el.remove(); $artistInList.replaceWith "<span class='artist-name'>#{a.name}</span>"
      el: $('<div>').appendTo @$('#artists-details')

  renderArtist: ->
    pa = _.find @displayables, (pa) => pa.get('artist').id is @artistId
    @appendArtist pa, true if pa?

  renderNextPageOfArtists: ->
    end = @pageSize * @nextPage; start = end - @pageSize
    for pa in @displayables.slice start, end
      @appendArtist pa if pa.get('published_artworks_count') > 0

    ++@nextPage
    if end >= @displayables.length then $(window).off '.partner_artists'

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('#artists-details .partner-artist:last')
    @renderNextPageOfArtists() unless fold < $lastItem.offset()?.top + $lastItem.height()

  renderLoading: ->
    unless @$loadingSpinner?
      @$el.after( @$loadingSpinner = $('<div class="loading-spinner"></div>') )
    @$loadingSpinner.show()

  hideLoading: -> @$loadingSpinner.hide()
