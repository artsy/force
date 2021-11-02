_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'querystring'
{ FilterArtworks } = require '../../collections/filter_artworks'
FilterView = require './view.coffee'
FilterRouter = require './router/index.coffee'

module.exports =

  setupFilter: (options) ->
    defaults =
      startHistory: yes
      infiniteScroll: true
      includeFixedHeader: includeFixedHeader
      includeAllWorksButton: false
      hideForSaleButton: false
      forSale: null

    { aggregations,
      context_module,
      el,
      stuckParam,
      defaultHeading,
      startHistory,
      infiniteScroll,
      filterRoot,
      includeFixedHeader,
      includeAllWorksButton,
      forSale,
      facets,
      hideForSaleButton,
      includeMediumFilterInAggregation
    } = _.defaults options, defaults

    queryParams = qs.parse(location.search.replace(/^\?/, ''))
    params = new Backbone.Model _.extend queryParams,
      page: 1
      size: 10
      for_sale: forSale
      aggregations: aggregations

    if stuckParam
      params.set stuckParam

    if includeMediumFilterInAggregation
      params.set includeMediumFilterInAggregation

    collection = new FilterArtworks

    view = new FilterView
      el: el
      collection: collection
      params: params
      defaultHeading: defaultHeading
      filterRoot: filterRoot
      hideForSaleButton: hideForSaleButton
      includeAllWorksButton: includeAllWorksButton
      infiniteScroll: infiniteScroll
      includeFixedHeader: includeFixedHeader
      facets: facets
      aggregations: aggregations
      context_module: context_module

    router = new FilterRouter
      params: params
      urlRoot: filterRoot
      stuckParamKey: _.first(_.keys(stuckParam))

    collection.fetch
      data: params.toJSON()
      success: ->
        collection.trigger 'initial:fetch'
        params.unset('aggregations', silent: true)

    Backbone.history.start(pushState: true) if startHistory

    { params: params, collection: collection, view: view, router: router }
