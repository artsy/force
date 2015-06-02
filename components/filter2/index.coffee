_ = require 'underscore'
Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
qs = require 'querystring'
FilterArtworks = require '../../collections/filter_artworks.coffee'
FilterView = require './view.coffee'
FilterRouter = require './router/index.coffee'
{ FILTER_ROOT } = require('sharify').data

module.exports =

  setupFilter: (options) ->
    { aggregations, el, stuckParam, stuckFacet, hideForSale, includeAllWorks, dontStartHistory } = options

    queryParams = qs.parse(location.search.replace(/^\?/, ''))
    params = new Backbone.Model _.extend queryParams,
      page: 1
      size: 10
      aggregations: aggregations

    if stuckParam
      params.set stuckParam, stuckFacet.id

    collection = new FilterArtworks

    view = new FilterView
      el: el
      collection: collection
      params: params
      stuckFacet: stuckFacet
      hideForSale: hideForSale
      includeAllWorks: includeAllWorks

    router = new FilterRouter
      params: params
      urlRoot: FILTER_ROOT
      stuckParam: stuckParam

    collection.fetch
      data: params.toJSON()
      success: ->
        collection.trigger 'initial:fetch'

    Backbone.history.start pushState: true unless dontStartHistory

    { params: params, collection: collection, view: view, router: router }