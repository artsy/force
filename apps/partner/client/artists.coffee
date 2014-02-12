_              = require 'underscore'
sd             = require('sharify').data
Backbone       = require 'backbone'
CurrentUser    = require '../../../models/current_user.coffee'
Partner        = require '../../../models/partner.coffee'
Artist         = require '../../../models/artist.coffee'
PartnerArtists = require '../../../collections/partner_artists.coffee'
ArtistView     = require './artists_artist.coffee'
artistsListTemplate    = -> require('../templates/artists_list.jade') arguments...
template       = -> require('../templates/artists.jade') arguments...

module.exports = class PartnerArtistsView extends Backbone.View

  defaults:
    artistsListColumnSize: 6
    nextPage: 1
    pageSize: 6
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
        @renderArtistsList()
        if @artistId?
          @renderArtist()
        else
          if @collection.length > @pageSize
            $(window).on 'scroll.partner_artists', _.throttle(@infiniteScroll, 150)
          @renderNextPageOfArtists()

  renderArtistsList: ->
    @$el.find('#artists-list').html(
      $( artistsListTemplate groups: @groupPartnerArtists(@collection) )
    )

  renderArtist: ->
    new ArtistView
      model: new Artist id: @artistId
      el: $('<div></div>').appendTo @$('#artists-details')
      scroll: true

  renderNextPageOfArtists: ->
    end = @pageSize * @nextPage; start = end - @pageSize
    for pa in @collection.models.slice start, end
      new ArtistView
        model: new Artist pa.get('artist')
        el: $('<div></div>').appendTo @$('#artists-details')

    ++@nextPage
    if end >= @collection.length
      $(window).off '.partner_artists'

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('#artists-details .partner-artist:last')
    @renderNextPageOfArtists() unless fold < $lastItem.offset()?.top + $lastItem.height()

  groupPartnerArtists: (pas) ->
    h = Math.ceil pas.length / @artistsListColumnSize

    bigger  = label: "represented artists", list: pas.filter (pa) -> pa.get('represented_by')
    smaller = label: "works available by", list: pas.filter (pa) ->
      not pa.get('represented_by') and pa.get('published_artworks_count') > 0

    if bigger.list.length < smaller.list.length
      temp = bigger; bigger = smaller; smaller = temp
    if smaller.list.length is 0
      bigger.label = "artists"
 
    # Heuristics. Favor smaller column
    smaller.numOfCols = Math.ceil smaller.list.length / h
    bigger.numOfCols  = @artistsListColumnSize - smaller.numOfCols

    # Split an array into columns
    for g in [bigger, smaller]
      g.cols = []; step = Math.ceil g.list.length / g.numOfCols
      for i in [0..g.list.length] by step
        g.cols.push g.list.slice i, i + step
    
    _.filter [bigger, smaller], (g) -> g.cols.length > 0

  renderLoading: ->
    unless @$loadingSpinner?
      @$el.after( @$loadingSpinner = $('<div class="loading-spinner"></div>') )
    @$loadingSpinner.show()

  hideLoading: -> @$loadingSpinner.hide()
