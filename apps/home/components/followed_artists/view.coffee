Backbone = require 'backbone'
{ map, take } = require 'underscore'
{ API_URL } = require('sharify').data
Q = require 'bluebird-q'
Artist = require '../../../../models/artist.coffee'
Artists = require '../../../../collections/artists.coffee'
Items = require '../../../../collections/items.coffee'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
ArtworkBrickView = require '../../../../components/artwork_brick/view.coffee'
SearchArtistsView = require './search_artists_view.coffee'
FollowedArtistsView = require './followed_artists_view.coffee'
template = -> require('./templates/index.jade') arguments...

module.exports = class FollowedArtistsRailView extends Backbone.View
  subViews: []

  defaults:
    useInitialArtists: false
    showHeader: true
    includeContext: true

  initialize: (options = {}) ->
    { @module, @$el, @user, @useInitialArtists, @showHeader, @includeContext, @analyticsMessage } = _.defaults options, @defaults

  render: ->
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
    if @module.context.counts.artists < 1 or @module.results.length < 1 or @useInitialArtists
      return @_renderEmptyView()

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

  _renderEmptyView: ->
    # pre-populate search with featured artists or use initial artists
    if @useInitialArtists
      initialArtists = new Artists []
      @subViews.push sav = new SearchArtistsView
        el: @$('.arbv-follow-search-container')
        initialSuggestions: initialArtists
        followedArtists: new Artists []
        analyticsMessage: @analyticsMessage
      initialArtists.add @module.context.artists
    else
      featuredArtists = new Items [], id: '523089cd139b214d46000568', item_type: 'FeaturedLink'
      # empty collection to pass along to keep track of new follows
      followedArtists = new Artists @module.context.artists
      suggestedArtists = new Artists []

      Q.all [
        featuredArtists.fetch()
      ]
      .then ->
        # get the artist from the ids of the featured links :|
        ids = featuredArtists.pluck('href').map (href) ->
          href.replace('https://www.artsy.net/artist/','')
        artists = map ids, (id) -> new Artist id: id
        # return a promise for all the individual artist fetches
        Q.all(map(artists, (artist) -> artist.fetch()))
      .then (artists) =>
        @subViews.push sav = new SearchArtistsView
          el: @$('.arbv-follow-search-container')
          initialSuggestions: suggestedArtists
          followedArtists: followedArtists

        suggestedArtists.add artists

        @subViews.push fav = new FollowedArtistsView
          el: @$('.arbv-context--followed-artists')
          collection: followedArtists

  remove: ->
    invoke @subViews, 'remove'
    super