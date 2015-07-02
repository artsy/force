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
    defaults =
      startHistory: yes
      infiniteScroll: true
      includeFixedHeader: includeFixedHeader
      includeAllWorks: false
      hideForSale: false
      forSale: 'true' 

    { aggregations,
      el,
      stuckParam,
      stuckFacet,
      startHistory,
      infiniteScroll,
      includeFixedHeader,
      includeAllWorks,
      forSale,
      hideForSale } = _.defaults options, defaults

    queryParams = qs.parse(location.search.replace(/^\?/, ''))
    params = new Backbone.Model _.extend queryParams,
      page: 1
      size: 10
      for_sale: forSale
      aggregations: aggregations

    if stuckParam
      params.set stuckParam, stuckFacet.id

    collection = new FilterArtworks

    view = new FilterView
      el: el
      collection: collection
      params: params
      stuckFacet: stuckFacet
      stuckParam: stuckParam
      hideForSale: hideForSale
      includeAllWorks: includeAllWorks
      infiniteScroll: infiniteScroll
      includeFixedHeader: includeFixedHeader

    router = new FilterRouter
      params: params
      urlRoot: FILTER_ROOT
      stuckParam: stuckParam

    collection.fetch
      data: params.toJSON()
      success: ->
        collection.trigger 'initial:fetch'

    Backbone.history.start(pushState: true) if startHistory

    { params: params, collection: collection, view: view, router: router }