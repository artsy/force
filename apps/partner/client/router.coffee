Backbone = require 'backbone'
PartnerView = require './view.coffee'
FilterArtworks = require '../../../collections/filter_artworks.coffee'
filterSettings = require './filter_settings.coffee'
Q = require 'q'
_ = require 'underscore'

module.exports = class PartnerRouter extends Backbone.Router
  routes:
                                      #   gallery | institution
    ':id': 'index'                    #      x         x
    ':id/overview': 'overview'        #      x
    ':id/shows': 'shows'              #      x         x
    ':id/artists': 'artists'          #      x
    ':id/artist/:artistId': 'artists' #      x
    ':id/collection': 'collection'    #                x
    ':id/works': 'works'              #      X
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

  filterArtworks: (section, settings) ->
    filterArtworks = new FilterArtworks
    filterData = { size: 0, gallery: @partner.id, aggregations: settings.aggregations }

    filterArtworks.fetch data: filterData, success: =>
      @baseView.renderSection section, _.extend( { counts: filterArtworks.counts }, settings)

  collection: ->
    @filterArtworks('collection', filterSettings.settings(@partner, 'collection'))

  shop: ->
    @filterArtworks('shop', filterSettings.settings(@partner, 'shop'))

  works: ->
    @filterArtworks('works', filterSettings.settings(@partner, 'works'))

  articles: ->
    @baseView.renderSection 'articles'

  contact: ->
    @baseView.renderSection 'contact'

  about: ->
    @baseView.renderSection 'about'

