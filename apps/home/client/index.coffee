_               = require 'underscore'
mediator        = require '../../../lib/mediator.coffee'
CurrentUser     = require '../../../models/current_user.coffee'
Backbone        = require 'backbone'
HeroUnitView    = require './hero_unit_view.coffee'
Artworks        = require '../../../collections/artworks.coffee'
OrderedSets     = require '../../../collections/ordered_sets.coffee'
FeaturedLinks   = require '../../../collections/featured_links.coffee'
PartnerShows    = require '../../../collections/partner_shows.coffee'
HomeAuthRouter  = require './auth_router.coffee'
analytics       = require '../../../lib/analytics.coffee'
SaveControls    = require '../../../components/artwork_item/save_controls.coffee'
featuredLinksTemplate    = -> require('../templates/featured_links.jade') arguments...
featuredArtworksTemplate = -> require('../templates/featured_artworks.jade') arguments...
featuredShowsTemplate    = -> require('../templates/featured_shows.jade') arguments...
featuredPostsTemplate    = -> require('../templates/featured_posts.jade') arguments...
featuredArtistsTemplate  = -> require('../templates/featured_artists.jade') arguments...
Cookies = require 'cookies-js'

trackArtworkImpressions = require("../../../components/analytics/impression_tracking.coffee").trackArtworkImpressions

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
    @setupFavoritesOnboardingModal()
    @setupModal()

  setupFavoritesOnboardingModal: ->
    return unless @user and 'Set Management' in @user.get('lab_features')
    return if parseInt(Cookies.get 'favorites_onboarding_dismiss_count') >= 2
    OnboardingModal = require '../../../components/favorites2/client/onboarding_modal.coffee'
    new OnboardingModal width: 1000

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
        artworkModels = artworks.models[0..3]
        @setFeaturedArtworksHeader('New for you on Artsy')
        $('#home-featured-artworks').html featuredArtworksTemplate(artworks: artworkModels)
        @initializeArtworks artworksModels
      else
        @renderFeaturedArtworks()

  renderFeaturedArtworks: ->
    el = '#home-featured-artworks'
    new Artworks().fetchSetItemsByKey 'homepage:featured-artworks', success: (artworks) =>
      @setFeaturedArtworksHeader('Featured Artworks for Sale')
      artworkModels = artworks.models[0..3]
      $(el).html featuredArtworksTemplate
        artworks: artworkModels
        showBlurbs: true
      @initializeArtworks artworkModels

  initializeArtworks: (artworkModels) ->
    @user?.initializeDefaultArtworkCollection()
    artworkCollection = @user?.defaultArtworkCollection()
    for artwork in artworkModels
      new SaveControls
        artworkCollection: artworkCollection
        model: artwork
        el: @$("figure[data-artwork=#{artwork.get('id')}]").find('.overlay-container')

    if artworkCollection
      artworkCollection.addRepoArtworks new Backbone.Collection(artworkModels)
      artworkCollection.syncSavedArtworks()

    trackArtworkImpressions artworkModels, @$el

  # Open the signup modal for logged out users, or the login modal if the user has
  # signed in before, or if they have already dismissed it this session
  setupModal: ->
    return if @user? or location.search.match('no-auth-modal') or Cookies.get('dismissed_auth_modal')

    mediator.trigger 'open:auth',
      mode: if Cookies.get('signed_in') is 'true' then 'login' else 'signup'

    mediator.on 'modal:closed', ->
      Cookies.set 'dismissed_auth_modal', true

module.exports.init = ->
    new HomeView el: $('body')
