_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'querystring'
location = location

module.exports = class FilterRouter extends Backbone.Router

  initialize: ({ @urlRoot, @params, @stuckParamKey }) ->
    @firstLoad = true
    @params.on 'change', @navigateParams
    @setupRoutes()

  setupRoutes: ->
    @route "#{@urlRoot}/artworks", 'artworks'
    @route "#{@urlRoot}/artworks*", 'artworks'

  navigateParams: =>
    params = qs.stringify(_.omit @params.toJSON(), 'page', 'size', 'aggregations', @stuckParamKey)
    # Only add '/artworks' to the url if there are params
    # Do not redirect from /gene/:id to gene/:id/artworks on pageload
    if params?.length > 0
      @navigate "#{@urlRoot}?#{params}", replace: @firstLoad
    @firstLoad = false


  artworks: ->
    queryParams = qs.parse(location.search.replace(/^\?/, ''))
    params = _.extend queryParams, { page: 1, size: 10 }
    # Causes artworks to be fetched 1x for each param but is more reliable than passing `silent: true`
    @params.set(params)
