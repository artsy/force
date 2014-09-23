_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
splitTestInterface = require './split_test.coffee'
ArtistCarouselView = require '../../../components/artist_carousel/view.coffee'
HeaderView = require './views/header.coffee'
OverviewView = require './views/overview.coffee'
WorksView = require './views/works.coffee'
ShowsView = require './views/shows.coffee'
PostsView = require './views/posts.coffee'
RelatedArtistsView = require './views/related_artists.coffee'
{ ArtistData, sections } = require './data.coffee'

module.exports = class ArtistRouter extends Backbone.Router
  routes:
    'artist/:id': 'overview'
    'artist/:id/works': 'works'
    'artist/:id/shows': 'shows'
    'artist/:id/posts': 'posts'
    'artist/:id/related-artists': 'relatedArtists'

  initialize: ({ @model, @user }) ->
    @data = new ArtistData model: @model
    @options = model: @model, user: @user, data: @data

    @setupUser()
    @setupCarousel()
    @setupHeaderView()

    @listenTo @data, 'sync:all', @deferredDispatch
    @data.sync()

  setupUser: ->
    @user?.initializeDefaultArtworkCollection()

  setupCarousel: ->
    if splitTestInterface() is 'filter_carousel'
      new ArtistCarouselView el: $('#artist-carousel'), model: @model

  setupHeaderView: ->
    @headerView = new HeaderView _.extend el: $('#artist-page-header'), @options

  deferredDispatch: ->
    Backbone.history.loadUrl Backbone.history.fragment

  execute: ->
    @view?.remove()
    # Only execute a route handler if
    # the artist data is synced
    if @data.synced
      @headerView.renderNav()
      @setSection()
      super # Route handler
      @renderCurrentView()

  setSection: ->
    slug = _.last(Backbone.history.fragment.split '/')
    slug = '' if slug is @model.id
    @options.section = _.findWhere @data.sections, slug: slug

  renderCurrentView: ->
    (@$content ?= $('#artist-page-content'))
      .html @view.render().$el

  overview: ->
    @view = new OverviewView @options

  works: ->
    @view = new WorksView @options

  shows: ->
    @view = new ShowsView @options

  posts: ->
    @view = new PostsView @options

  relatedArtists: ->
    @view = new RelatedArtistsView @options
