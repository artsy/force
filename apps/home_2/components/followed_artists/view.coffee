Backbone = require 'backbone'
{ map, take } = require 'underscore'
{ API_URL } = require('sharify').data
Q = require 'bluebird-q'
Artist = require '../../../../models/artist.coffee'
Artists = require '../../../../collections/artists.coffee'
Items = require '../../../../collections/items.coffee'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
SearchArtistsView = require './search_artists_view.coffee'
FollowedArtistsView = require './followed_artists_view.coffee'
template = -> require('./templates/index.jade') arguments...

module.exports = class FollowedArtistsRailView extends Backbone.View
  subViews: []

  initialize: ({ @module, @$el }) ->
    # no op

  render: ->
    artists = new Backbone.Collection @module.context.artists

    @$el.html template
      artworks: @module.results
      counts: @module.context.counts
      artists: artists.models
      imageHeight: '220px'

    @_postRender()

  _postRender: ->
    return @_renderEmptyView() if @module.context.counts.artists < 1
    initCarousel @$('.js-my-carousel'),
      imagesLoaded: false
      wrapAround: false
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
    # pre-populate search with featured artists
    featuredArtists = new Items [], id: '523089cd139b214d46000568', item_type: 'FeaturedLink'
    # empty collection to pass along to keep track of new follows
    followedArtists = new Artists []
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