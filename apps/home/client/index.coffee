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
artworkItemTemplate = -> require('../../../components/artwork_item/template.jade') arguments...

module.exports.init = ->

  # Set up the hero unit view
  new HeroUnitView
    el: $('body')
    $mainHeader: $('#main-layout-header')

  # Set up a router for the /log_in /sign_up and /forgot routes
  window.router = new HomeAuthRouter
  Backbone.history.start pushState: true

  # Render all of the featured sections
  new Artworks().fetchSetItemsByKey 'homepage:featured-artworks', success: (artworks) ->
    $('#home-featured-artworks').html featuredArtworksTemplate(
      artworks: artworks.models[0..3]
      artworkItemTemplate: artworkItemTemplate
    )
  new PartnerShows().fetchSetItemsByKey 'homepage:featured-shows', success: (shows) ->
    $('#home-featured-shows').html featuredShowsTemplate(shows: shows.models[0..9])
  new FeaturedLinks().fetchSetItemsByKey 'homepage:featured-links', success: (links) ->
    $('#home-featured-posts').html featuredPostsTemplate(postLinks: links.models[0..6])
  new FeaturedLinks().fetchSetItemsByKey 'homepage:featured-artists', success: (links) ->
    $('#home-featured-artists').html featuredArtistsTemplate(artistLinks: links.models[0..3])