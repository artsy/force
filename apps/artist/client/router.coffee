_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
qs = require 'querystring'
Backbone = require 'backbone'
initCarousel = require '../../../components/merry_go_round/horizontal_nav_mgr.coffee'
OverviewView = require './views/overview.coffee'
WorksView = require './views/works.coffee'
CVView = require './views/cv.coffee'
ShowsView = require './views/shows.coffee'
ArticlesView = require './views/articles.coffee'
RelatedArtistsView = require './views/related_artists.coffee'
BiographyView = require './views/biography.coffee'
AuctionLots = require '../../../collections/auction_lots.coffee'
AuctionResultsView = require './views/auction_results.coffee'
HeaderView = require './views/header.coffee'
JumpView = require '../../../components/jump/view.coffee'
mediator = require '../../../lib/mediator.coffee'
attachCTA = require './cta.coffee'

module.exports = class ArtistRouter extends Backbone.Router
  routes:
    'artist/:id': 'overview'
    'artist/:id/cv': 'cv'
    'artist/:id/works': 'works'
    'artist/:id/shows': 'shows'
    'artist/:id/articles': 'articles'
    'artist/:id/collections': 'collections'
    'artist/:id/publications': 'publications'
    'artist/:id/related-artists': 'relatedArtists'
    'artist/:id/biography': 'biography'
    'artist/:id/auction-results': 'auctionResults'

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
    mediator.on 'overview:fetches:complete', =>
      attachCTA @model

  cv: ->
    @view = new CVView @options

  works: ->
    @view = new WorksView @options
    $('body').append @jump.$el

  shows: ->
    @view = new ShowsView @options

  articles: ->
    @view = new ArticlesView @options

  relatedArtists: ->
    @view = new RelatedArtistsView @options

  biography: ->
    @view = new BiographyView @options

  auctionResults: ->
    { sort, page } = qs.parse(location.search.replace(/^\?/, ''))
    currentPage = parseInt page or 1
    auctionLots = new AuctionLots [], id: @model.get('id'), sortBy: sort, state: currentPage: currentPage
    
    @view = new AuctionResultsView _.extend {}, @options, collection: auctionLots
    auctionLots.fetch()
