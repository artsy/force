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
mediator = require '../../../lib/mediator.coffee'
attachCTA = require './cta.coffee'

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
    @setupCarousel()
    @setupHeaderView()

  setupUser: ->
    @user?.initializeDefaultArtworkCollection()

  setupCarousel: ->
    initCarousel $('.js-artist-carousel'), imagesLoaded: true

  setupHeaderView: ->
    @headerView = new HeaderView _.extend {}, @options, el: $('#artist-page-header')

  execute: ->
    return if @view? # Sets up a view once, depending on route
    super
    @renderCurrentView()

  renderCurrentView: ->
    @view.render()

  overview: ->
    @view = new OverviewView @options
    mediator.on 'overview:fetches:complete', =>
      attachCTA @model

  cv: ->
    @view = new CVView @options

  works: ->
    @view = new WorksView @options

  shows: ->
    @view = new ShowsView @options

  articles: ->
    @view = new ArticlesView @options

  relatedArtists: ->
    @view = new RelatedArtistsView @options

  biography: ->
    @view = new BiographyView @options
