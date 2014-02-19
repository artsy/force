_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'querystring'

module.exports = class FilterRouter extends Backbone.Router

  initialize: (options) ->
    _.extend @, options
    @params.on 'change', @navigateArtworkParams

  navigateArtworkParams: =>
    @navigate "/artworks?" + qs.stringify(@params.toJSON())

  routes:
    'artworks': 'artworks'
    'artworks*': 'artworks'

  artworks: ->
    queryParams = qs.parse(location.search.replace(/^\?/, ''))
    @params.set(queryParams).trigger('reset')