Backbone = require 'backbone'
{ map, take, defaults } = require 'underscore'
{ API_URL } = require('sharify').data
Artist = require '../../../../models/artist.coffee'
Artists = require '../../../../collections/artists.coffee'
Items = require '../../../../collections/items.coffee'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
ArtworkBrickView = require '../../../../components/artwork_brick/view.coffee'
FollowedArtistsView = require './followed_artists_view.coffee'
template = -> require('./templates/index.jade') arguments...

module.exports = class FollowedArtistsRailView extends Backbone.View
  subViews: []

  defaults:
    showHeader: true
    includeContext: true

  initialize: (options = {}) ->
    { @module, @$el, @user, @showHeader, @includeContext, @analyticsMessage } = defaults options, @defaults

  render: ->
    if @module.context.counts.artists < 1 or @module.results.length < 1
      return

    artists = new Backbone.Collection @module.context.artists

    @$el.html template
      artworks: @module.results
      counts: @module.context.counts
      artists: artists.models
      imageHeight: '220px'
      showHeader: @showHeader
      includeContext: @includeContext

    @_postRender()

  _postRender: ->
    @setupArtworkViews()
    @setupCarousel()

  setupArtworkViews: ->
    if @module.results.length
      @subViews = @module.results.map ({ id }) =>
        $el = @$(".js-artwork-brick[data-id='#{id}']")
        view = new ArtworkBrickView
          el: $el
          id: id
          user: @user

        view.postRender()
        view

    @user.related().savedArtworks
      .check @module.results.map ({ id }) -> id

  setupCarousel: ->
    initCarousel @$('.js-my-carousel'),
      imagesLoaded: false
      wrapAround: false
      groupCells: true
    , (carousel) =>
      @trigger 'post-render'
      @carousel = carousel

      # Hide arrows if the cells don't fill the carousel width
      @cellWidth = @$('.js-mgr-cell')
        .map (i, e) -> $(e).outerWidth true
        .get()
        .reduce (prev, curr) -> prev + curr

      unless @cellWidth > @$('.js-my-carousel').width()
        @$('.mgr-navigation').addClass 'is-hidden'

  _parseAndFetchArtists: (featuredArtists) =>
    # get the artist from the ids of the featured links :|

    ids = featuredArtists.pluck('href')
      .filter (href) ->
        # filter out links that aren't specifically to artists
        href.indexOf('https://www.artsy.net/artist/') > -1
      .map (href) ->
        # remove any query params
        href.split("?")[0].replace('https://www.artsy.net/artist/','')

    artists = map ids, (id) -> new Artist id: id

    # return a promise for all the individual artist fetches
    Promise.all(map(artists, (artist) -> artist.fetch()))

  remove: ->
    invoke @subViews, 'remove'
    super
