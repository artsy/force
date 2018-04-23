_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
qs = require 'querystring'
Backbone = require 'backbone'
initCarousel = require '../../../components/merry_go_round/horizontal_nav_mgr.coffee'
OverviewView = require './views/overview.coffee'
ArtworkFilterView = require '../../../components/artwork_filter_2/view.coffee'
CVView = require './views/cv.coffee'
ShowsView = require './views/shows.coffee'
ArticlesView = require './views/articles.coffee'
RelatedArtistsView = require './views/related_artists.coffee'
BiographyView = require './views/biography.coffee'
HeaderView = require './views/header.coffee'
JumpView = require '../../../components/jump/view.coffee'
mediator = require '../../../lib/mediator.coffee'
attachCTA = require './cta.coffee'
AuctionLots = require '../../../collections/auction_lots.coffee'
ArtistAuctionResultsView = require './views/auction_results.coffee'
Artist = require '../../../models/artist.coffee'

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
    @useNewArtworkFilter = @user?.hasLabFeature('Refactored Artwork Filter')

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
    @view.fetchRelated?()
    @view.render()

  overview: ->
    @view = new OverviewView @options
    $('body').append @jump.$el
    @view.on 'artist:overview:sync', (artist) =>
      attachCTA new Artist(_.extend({}, artist, @model.attributes))

  cv: ->
    @view = new CVView @options
    @model.related().artworks.fetch(data: { size: 20, sort:'-partner_updated_at' })

  works: ->
    @view = new ArtworkFilterView
      el: @options.el
      artistID: @model.get('id')
      topOffset: $('.artist-sticky-header-container').height()

    $('body').append @jump.$el

  shows: ->
    @view = new ShowsView @options
    @model.related().artworks.fetch(data: { size: 20, sort:'-partner_updated_at' })

  articles: ->
    @view = new ArticlesView @options
    @model.related().articles.fetch()
    @model.related().artworks.fetch(data: { size: 20, sort:'-partner_updated_at' })

  relatedArtists: ->
    @view = new RelatedArtistsView @options
    @model.related().artworks.fetch(data: { size: 20, sort:'-partner_updated_at' })

  biography: ->
    @view = new BiographyView @options
    @model.related().articles.fetch
      cache: true
      data:
        limit: 1
        biography_for_artist_id: @model.get('_id')

  auctionResults: ->
    { sort, page } = qs.parse(location.search.replace(/^\?/, ''))
    currentPage = parseInt page or 1
    auctionLots = new AuctionLots [], id: @model.get('id'), sortBy: sort, state: currentPage: currentPage

    @view = new ArtistAuctionResultsView _.extend {}, @options, collection: auctionLots
    auctionLots.fetch()
    @model.related().artworks.fetch(data: size: 15)
