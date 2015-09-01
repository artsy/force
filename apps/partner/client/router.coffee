Backbone = require 'backbone'
PartnerView = require './view.coffee'
FilterArtworks = require '../../../collections/filter_artworks.coffee'
Q = require 'q'
filterSettings = require './filter_settings.coffee'

module.exports = class PartnerRouter extends Backbone.Router
  routes:
                                      #   gallery | institution
    ':id': 'index'                    #      x         x
    ':id/overview': 'overview'        #      x
    ':id/shows': 'shows'              #      x         x
    ':id/artists': 'artists'          #      x
    ':id/artist/:artistId': 'artists' #      x
    ':id/collection': 'collection'    #                x
    ':id/articles': 'articles'        #      x         x
    ':id/articles': 'articles'        #      x         x
    ':id/shop': 'shop'                #                x
    ':id/contact': 'contact'          #      x
    ':id/about': 'about'              #                x

  initialize: ({ @profile, @partner }) ->
    @baseView = new PartnerView el: $('#partner'), model: @profile, partner: @partner

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
    filterArtworks = new FilterArtworks
    aggregations = filterSettings.collection.aggregations
    filterData = { size: 0, gallery: @partner.id, aggregations: aggregations }
    Q.all([
      filterArtworks.fetch(data: filterData)
    ]).done =>
      @baseView.renderSection 'collection', _.extend( { counts: filterArtworks.counts }, filterSettings.collection)

  articles: ->
    @baseView.renderSection 'articles'

  shop: ->
    filterArtworks = new FilterArtworks
    aggregations = filterSettings.shop.aggregations
    filterData = { size: 0, gallery: @partner.id, aggregations: aggregations }
    Q.all([
      filterArtworks.fetch(data: filterData)
    ]).done =>
      @baseView.renderSection 'shop', _.extend( { counts: filterArtworks.counts }, filterSettings.shop)

  contact: ->
    @baseView.renderSection 'contact'

  about: ->
    @baseView.renderSection 'about'

