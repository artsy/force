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
    params = qs.stringify(_.omit @params.toJSON(), 'page', 'size')
    # Only add /artworks to the url if there are params
    # NOTE: This causes a problem going from /artworks?foo=bar back to /artworks
    # Due to the complexity of gene pages (subject matter vs regular) we cannot have an 'else @navigate /artworks'
    if params?.length > 0
      @navigate "#{@urlRoot}/artworks?#{params}"

  artworks: ->
    queryParams = qs.parse(location.search.replace(/^\?/, ''))
    params = _.extend queryParams, { page: 1, size: 10 }
    @params.set(params, silent: true)
