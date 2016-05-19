_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
initCarousel = require '../../../components/merry_go_round/horizontal_nav_mgr.coffee'
OverviewView = require './views/overview.coffee'
WorksView = require './views/works.coffee'
CVView = require './views/cv.coffee'
ShowsView = require './views/shows.coffee'
ArticlesView = require './views/articles.coffee'
RelatedArtistsView = require './views/related_artists.coffee'
BiographyView = require './views/biography.coffee'
HeaderView = require './views/header.coffee'
JumpView = require '../../../components/jump/view.coffee'
mediator = require '../../../lib/mediator.coffee'
attachCTA = require './cta.coffee'
query = require './query.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'

module.exports = class ArtistRouter extends Backbone.Router
  routes:
    'artist_2/:id': 'overview'
    'artist_2/:id/cv': 'cv'
    'artist_2/:id/works': 'works'
    'artist_2/:id/shows': 'shows'
    'artist_2/:id/articles': 'articles'
    'artist_2/:id/collections': 'collections'
    'artist_2/:id/publications': 'publications'
    'artist_2/:id/related-artists': 'relatedArtists'
    'artist_2/:id/biography': 'biography'

  initialize: ({ @model, @user, @statuses }) ->
    @options = model: @model, user: @user, statuses: @statuses, el: $('.artist-page-content')
    @setupUser()
    @setupJump()
    @setupCarousel()
    @setupHeaderView()

  setupUser: ->
    @user?.initializeDefaultArtworkCollection()

  setupJump: ->
    @jump = new JumpView threshold: $(window).height(), direction: 'bottom'

  setupCarousel: ->
    initCarousel $('.js-artist-carousel'), imagesLoaded: true

  setupHeaderView: ->
    @headerView = new HeaderView _.extend {}, @options, el: $('#artist-page-header'), jump: @jump

  execute: ->
    return if @view? # Sets up a view once, depending on route
    super
    @renderCurrentView()

  renderCurrentView: ->
    @view.render()

  overview: ->
    @view = new OverviewView @options
    $('body').append @jump.$el
    mediator.on 'artist:related:sync', =>
      attachCTA @model

    @fetchRelated
      artist_id: @model.get('id')
      artists: @statuses.artists
      exhibitionHighlights: @statuses.shows

  cv: ->
    @view = new CVView @options
    @model.related().shows.fetchUntilEnd()
    @model.related().artworks.fetch(data: size: 15)
    @model.related().articles.fetch
      cache: true
      data: limit: 50

  fetchRelated: (variables)->
    metaphysics
      query: query
      variables: _.defaults variables,
        artist_id: false
        contemporary: false
        artists: false
        exhibitionHighlights: false
        showGroupings: false
        fairs: false
    .then ({ artist }) => mediator.trigger 'artist:related:sync', artist

  works: ->
    @view = new WorksView @options
    $('body').append @jump.$el

  shows: ->
    @view = new ShowsView @options
    @model.related().artworks.fetch(data: size: 15)
    @fetchRelated
      artist_id: @model.get('id')
      showGroupings: @statuses.shows
      fairs: @statuses.shows

  articles: ->
    @view = new ArticlesView @options
    @model.related().articles.fetch()
    @model.related().artworks.fetch(data: size: 15)

  relatedArtists: ->
    @view = new RelatedArtistsView @options
    @model.related().artworks.fetch(data: size: 15)
    @fetchRelated
      artist_id: @model.get('id')
      contemporary: @statuses.contemporary
      artists: @statuses.artists

  biography: ->
    @view = new BiographyView @options
    @model.related().articles.fetch
      cache: true
      data:
        limit: 1
        biography_for_artist_id: @model.get('_id')
