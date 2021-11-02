Backbone = require 'backbone'
PartnerView = require './view.coffee'
{ FilterArtworks } = require '../../../collections/filter_artworks'
filterSettings = require './filter_settings.coffee'
_ = require 'underscore'
sd = require('sharify').data
{ mediator } = require '../../../../lib/mediator'

module.exports = class PartnerRouter extends Backbone.Router
  routes:
                                      #   gallery | institution
    ':id': 'index'                    #      x         x
    ':id/overview': 'overview'        #      x         x
    ':id/shows': 'shows'              #      x         x
    ':id/works': 'works'              #      x
    ':id/collection': 'collection'    #                x
    ':id/shop': 'shop'                #                x
    ':id/artists': 'artists'          #      x         x?
    ':id/artist/:artistId': 'artists' #      x         x
    ':id/articles': 'articles'        #      x         x
    ':id/contact': 'contact'          #      x
    ':id/about': 'about'              #                x
    ':id/article/:articleId': 'articles' #   x         x

  initialize: ({ @profile, @partner }) ->
    @baseView = new PartnerView el: $('#partner'), profile: @profile, partner: @partner, currentSection: sd.SECTION
    mediator.on 'change:route', (route) =>
      @navigate "#{@partner.href()}/#{route}", trigger: true, replace: true

  index: ->
    @baseView.renderSection 'overview'

  overview: ->
    @baseView.renderSection 'overview'

  shows: ->
    @baseView.renderSection 'shows'

  filterArtworks: (section, settings) ->
    render = (filterArtworks) =>
      @baseView.renderSection section, _.extend( { counts: filterArtworks.counts }, settings)

    if filterArtworks = @[section + 'FilterArtworks']
      render(filterArtworks)
    else
      filterArtworks = new FilterArtworks
      filterData = { size: 0, gallery: @partner.id, aggregations: settings.aggregations }

      filterArtworks.fetch data: filterData, success: =>
        render(filterArtworks)
        @[section + 'FilterArtworks'] = filterArtworks

  collection: ->
    @filterArtworks('collection', filterSettings.settings(@partner, 'collection'))

  shop: ->
    @filterArtworks('shop', filterSettings.settings(@partner, 'shop'))

  works: ->
    @filterArtworks('works', filterSettings.settings(@partner, 'works'))

  artists: (id, artistId) ->
    @baseView.renderSection 'artists', { artistId: artistId }

  articles: ->
    @baseView.renderSection 'articles'

  contact: ->
    @baseView.renderSection 'contact'

  about: ->
    @baseView.renderSection 'about'
