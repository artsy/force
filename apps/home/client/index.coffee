_ = require 'underscore'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
mediator = require '../../../lib/mediator.coffee'
{ crop } = require '../../../components/resizer/index.coffee'
CurrentUser = require '../../../models/current_user.coffee'
HeroUnitView = require './hero_unit_view.coffee'
FeaturedLinks = require '../../../collections/featured_links.coffee'
PartnerShows = require '../../../collections/partner_shows.coffee'
HomeAuthRouter = require './auth_router.coffee'
FeaturedArtworksView = require '../components/featured_artworks/view.coffee'
featuredLinksTemplate = -> require('../templates/featured_links.jade') arguments...
featuredShowsTemplate = -> require('../templates/featured_shows.jade') arguments...
featuredPostsTemplate = -> require('../templates/featured_posts.jade') arguments...
featuredArtistsTemplate = -> require('../templates/featured_artists.jade') arguments...

module.exports.HomeView = class HomeView extends Backbone.View
  initialize: (options) ->
    @user = CurrentUser.orNull()

    # Set up a router for the /log_in /sign_up and /forgot routes
    new HomeAuthRouter
    Backbone.history.start pushState: true

    @setupHeroUnits()

    # Render all of the featured sections
    @renderArtworks()
    @renderFeaturedShows()
    @renderFeaturedPosts()
    @renderFeaturedArtists()
    @setupFavoritesOnboardingModal()

  setupHeroUnits: ->
    new HeroUnitView el: @$el, $mainHeader: $('#main-layout-header')

  setupFavoritesOnboardingModal: ->
    return unless @user and 'Set Management' in @user.get('lab_features')
    return if parseInt(Cookies.get 'favorites_onboarding_dismiss_count') >= 2
    OnboardingModal = require '../../../components/favorites2/client/onboarding_modal.coffee'
    new OnboardingModal width: 1000

  renderArtworks: ->
    subView = new FeaturedArtworksView user: @user
    subView.collection.fetch()
    @$('#home-featured-artworks-section').html subView.render().$el

  renderFeaturedArtists: ->
    new FeaturedLinks().fetchSetItemsByKey 'homepage:featured-artists', success: (links) ->
      $('#home-featured-artists').html featuredArtistsTemplate(artistLinks: links.take(4), crop: crop)

  renderFeaturedPosts: ->
    new FeaturedLinks().fetchSetItemsByKey 'homepage:featured-links', success: (links) ->
      $('#home-featured-posts').html featuredPostsTemplate(postLinks: links.take(7))

  renderFeaturedShows: ->
    new PartnerShows().fetchSetItemsByKey 'homepage:featured-shows', success: (shows) ->
      $('#home-featured-shows').html featuredShowsTemplate(shows: shows.take(10), crop: crop)

module.exports.init = ->
  new HomeView el: $('body')
  require './analytics.coffee'
