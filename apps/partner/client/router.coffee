Backbone = require 'backbone'
PartnerView = require './view.coffee'

module.exports = class ArtworkRouter extends Backbone.Router
  routes:
                                              #   gallery | institution
    ':id': 'index'       #      x         x
    ':id/overview': 'overview'    #      x
    ':id/shows': 'shows'       #      x         x
    ':id/artists': 'artists'     #      x
    ':id/artist/:artistId': 'artists'     #      x
    ':id/collection': 'collection'  #                x
    ':id/posts': 'posts'       #      x         x
    ':id/shop': 'shop'        #                x
    ':id/contact': 'contact'     #      x
    ':id/about': 'about'       #                x

  initialize: (options) ->
    { @profile } = options
    @baseView = new PartnerView el: $('#partner'), model: @profile

  index: ->
    section = 'overview' # default for galleries
    section = 'shows' if @profile.isInstitution()
    @baseView.renderSection section

  overview: ->
    @baseView.renderSection 'overview'

  shows: ->
    @baseView.renderSection 'shows'

  artists: (id, artistId) ->
    @baseView.renderSection 'artists', { artistId: artistId }

  collection: ->
    @baseView.renderSection 'collection', { isForSale: false }

  posts: ->
    @baseView.renderSection 'posts'

  shop: ->
    @baseView.renderSection 'shop', { isForSale: true }

  contact: ->
    @baseView.renderSection 'contact'

  about: ->
    @baseView.renderSection 'about'

