Backbone        = require 'backbone'
PartnerView     = require './view.coffee'

module.exports = class ArtworkRouter extends Backbone.Router
  routes:
                                              #   gallery | institution
    ':id'                     : 'index'       #      x         x
    ':id/overview'            : 'overview'    #      x
    ':id/shows'               : 'shows'       #      x         x
    ':id/artists'             : 'artists'     #      x
    ':id/artist(/:artistId)'  : 'artists'     #      x
    ':id/collection'          : 'collection'  #                x
    ':id/posts'               : 'posts'       #      x         x 
    ':id/shop'                : 'shop'        #                x
    ':id/contact'             : 'contact'     #      x
    ':id/about'               : 'about'       #                x

  initialize: (options) ->
    { @profile } = options
    @baseView = new PartnerView el: $('#partner'), model: @profile

  index: ->
    @baseView.route 'overview' # diff params of navigate

  overview: ->
    @baseView.route 'overview'

  shows: ->
    @baseView.route 'shows'

  artists: (id, artistId) ->
    @baseView.route 'artists', { artistId: artistId }

  collection: ->
    @baseView.route 'collection', { isForSale : false }

  posts: ->
    @baseView.route 'posts'

  shop: ->
    @baseView.route 'shop', { isForSale : true }

  contact: ->
    @baseView.route 'contact'

  about: ->
    @baseView.route 'about'

