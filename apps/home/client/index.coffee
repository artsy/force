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
featuredLinksTemplate = -> require('../templates/featured_links.jade') arguments...
featuredArtworksTemplate = -> require('../templates/featured_artworks.jade') arguments...
featuredShowsTemplate = -> require('../templates/featured_shows.jade') arguments...
featuredPostsTemplate = -> require('../templates/featured_posts.jade') arguments...
featuredArtistsTemplate = -> require('../templates/featured_artists.jade') arguments...
{ readCookie } = require '../../../components/util/cookie.coffee'
user = null

module.exports.init = ->

  user = CurrentUser.orNull()

  # Set up the hero unit view
  new HeroUnitView
    el: $('body')
    $mainHeader: $('#main-layout-header')

  # Set up a router for the /log_in /sign_up and /forgot routes
  new HomeAuthRouter
  Backbone.history.start pushState: true

  # Render all of the featured sections
  new Artworks().fetchSetItemsByKey 'homepage:featured-artworks', success: (artworks) ->
    $('#home-featured-artworks').html featuredArtworksTemplate(artworks: artworks.models[0..3])
  new PartnerShows().fetchSetItemsByKey 'homepage:featured-shows', success: (shows) ->
    $('#home-featured-shows').html featuredShowsTemplate(shows: shows.models[0..9])
  new FeaturedLinks().fetchSetItemsByKey 'homepage:featured-links', success: (links) ->
    $('#home-featured-posts').html featuredPostsTemplate(postLinks: links.models[0..6])
  new FeaturedLinks().fetchSetItemsByKey 'homepage:featured-artists', success: (links) ->
    $('#home-featured-artists').html featuredArtistsTemplate(artistLinks: links.models[0..3])
  if user and 'Suggested Artworks' in user.get('lab_features')
    user.fetchSuggestedHomepageArtworks success: (artworks) ->
      $('#home-suggested-artworks').html featuredArtworksTemplate(artworks: artworks.models[0..3])

  # Open the signup modal for logged out users, or the login modal if the user has
  # signed in before.
  return if user?
  _.defer -> mediator.trigger 'open:auth',
    mode: if readCookie('signed_in') is 'true' then 'login' else 'signup'