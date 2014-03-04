_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'querystring'

module.exports = class FilterRouter extends Backbone.Router

  initialize: (options) ->
    _.extend @, options
    @params.on 'change', @navigateParams
    @setupRoutes()

  setupRoutes: ->
    @route "#{@urlRoot}/artworks", 'artworks'
    @route "#{@urlRoot}/artworks*", 'artworks'

  navigateParams: =>
    @navigate "#{@urlRoot}/artworks?" + qs.stringify(_.omit @params.toJSON(), 'page', 'size')

  artworks: ->
    queryParams = qs.parse(location.search.replace(/^\?/, ''))
    @params.set(_.extend queryParams, { page: 1, size: 10 }).trigger('reset')
