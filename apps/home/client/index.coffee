_ = require 'underscore'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Backbone = require 'backbone'
HeroUnitView = require './hero_unit_view.coffee'
OrderedSets = require '../../../collections/ordered_sets.coffee'
FeaturedLinks = require '../../../collections/featured_links.coffee'
Artworks = require '../../../collections/artworks.coffee'
PartnerShows = require '../../../collections/partner_shows.coffee'
HomeAuthRouter = require './auth_router.coffee'
analytics      = require '../../../lib/analytics.coffee'
featuredLinksTemplate = -> require('../templates/featured_links.jade') arguments...
featuredArtworksTemplate = -> require('../templates/featured_artworks.jade') arguments...
featuredShowsTemplate = -> require('../templates/featured_shows.jade') arguments...
featuredPostsTemplate = -> require('../templates/featured_posts.jade') arguments...
featuredArtistsTemplate = -> require('../templates/featured_artists.jade') arguments...
{ readCookie, createCookie } = require '../../../components/util/cookie.coffee'

module.exports.HomeView = class HomeView extends Backbone.View

  events:
    'click #home-featured-artworks'       : 'onClickFeaturedArtwork'

  onClickFeaturedArtwork: ->
    analytics.track.click "Clicked homepage artwork"

  initialize: (options) ->
    @user = CurrentUser.orNull()

    # Set up the hero unit view
    new HeroUnitView
      el: $('body')
      $mainHeader: $('#main-layout-header')

    # Set up a router for the /log_in /sign_up and /forgot routes
    new HomeAuthRouter
    Backbone.history.start pushState: true

    # Render all of the featured sections
    @renderArtworks()
    @renderFeaturedShows()
    @renderFeaturedPosts()
    @renderFeaturedArtists()

    @setupModal()

  renderArtworks: ->
    if @user and @user.hasSuggestions()
      @renderSuggestedArtworks()
    else
      @renderFeaturedArtworks()

  renderFeaturedArtists: ->
    new FeaturedLinks().fetchSetItemsByKey 'homepage:featured-artists', success: (links) ->
      $('#home-featured-artists').html featuredArtistsTemplate(artistLinks: links.models[0..3])

  renderFeaturedPosts: ->
    new FeaturedLinks().fetchSetItemsByKey 'homepage:featured-links', success: (links) ->
      $('#home-featured-posts').html featuredPostsTemplate(postLinks: links.models[0..6])

  renderFeaturedShows: ->
    new PartnerShows().fetchSetItemsByKey 'homepage:featured-shows', success: (shows) ->
      $('#home-featured-shows').html featuredShowsTemplate(shows: shows.models[0..9])

  setFeaturedArtworksHeader: (text) ->
    return $(".home-featured-header.top-featured-header").text(text)

  # falls back to featured content if no suggestions for this user.
  renderSuggestedArtworks: ->
    @user.fetchSuggestedHomepageArtworks success: (artworks) =>
      if artworks.models.length
        this.setFeaturedArtworksHeader('New for you on Artsy')
        $('#home-featured-artworks').html featuredArtworksTemplate(artworks: artworks.models[0..3])
      else
        this.renderFeaturedArtworks()

  renderFeaturedArtworks: ->
    el = '#home-featured-artworks'
    new Artworks().fetchSetItemsByKey 'homepage:featured-artworks', success: (artworks) =>
      this.setFeaturedArtworksHeader('Featured Artworks for Sale')
      $(el).html featuredArtworksTemplate
        artworks: artworks.models[0..3]
        showBlurbs: true

  # Open the signup modal for logged out users, or the login modal if the user has
  # signed in before, or if they have already dismissed it this session
  setupModal: ->
    return if @user? or location.search.match('no-auth-modal') or readCookie('dismissed_auth_modal')

    mediator.trigger 'open:auth',
      mode: if readCookie('signed_in') is 'true' then 'login' else 'signup'

    mediator.on 'modal:closed', ->
      createCookie 'dismissed_auth_modal', true

module.exports.init = ->
    new HomeView el: $('body')
