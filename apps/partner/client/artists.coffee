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
    @$el.find('#artists-list').html(
      $( artistsListTemplate groups: @groupPartnerArtists(@displayables) )
    )

  appendArtist: (artist, scroll=false) ->
    new ArtistView
      model: artist
      scroll: scroll
      el: $('<div>').appendTo @$('#artists-details')

  renderArtist: ->
    @appendArtist (new Artist id: @artistId), true

  renderNextPageOfArtists: ->
    end = @pageSize * @nextPage; start = end - @pageSize
    for pa in @displayables.slice start, end
      @appendArtist new Artist pa.get('artist')

    ++@nextPage
    if end >= @displayables.length then $(window).off '.partner_artists'

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('#artists-details .partner-artist:last')
    @renderNextPageOfArtists() unless fold < $lastItem.offset()?.top + $lastItem.height()

  groupPartnerArtists: (pas) ->
    h = Math.ceil pas.length / @artistsListColumnSize

    groups = _.groupBy pas, (pa) -> pa.get 'represented_by'
    bigger  = label: "represented artists", list: groups.true or []
    smaller = label: "works available by", list: groups.false or []

    if bigger.list.length < smaller.list.length
      temp = bigger; bigger = smaller; smaller = temp
    if smaller.list.length is 0
      bigger.label = "artists"
 
    smaller.numOfCols = Math.ceil smaller.list.length / h
    bigger.numOfCols  = @artistsListColumnSize - smaller.numOfCols

    # Split arrays into columns
    for g in [bigger, smaller]
      g.cols = []; step = Math.ceil g.list.length / g.numOfCols
      for pa, i in g.list by step
        g.cols.push g.list.slice i, i + step
    
    _.filter [bigger, smaller], (g) -> g.list.length > 0

  renderLoading: ->
    unless @$loadingSpinner?
      @$el.after( @$loadingSpinner = $('<div class="loading-spinner"></div>') )
    @$loadingSpinner.show()

  hideLoading: -> @$loadingSpinner.hide()
