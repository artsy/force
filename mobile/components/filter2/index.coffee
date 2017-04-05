_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'qs'
FilterArtworks = require '../../collections/filter_artworks'
FilterView = require './view'
{ FILTER_ROOT } = require('sharify').data

module.exports =

  setupFilter: (options) ->
    defaults =
      startHistory: yes

    { aggregations, el, stuckParam, stuckFacet } = _.defaults options, defaults

    queryParams = qs.parse(location.search.replace(/^\?/, ''))
    params = new Backbone.Model _.extend queryParams,
      page: 1
      size: 10
      aggregations: aggregations
      for_sale: true

    if stuckParam
      params.set stuckParam, stuckFacet.id

    collection = new FilterArtworks

    view = new FilterView
      el: el
      collection: collection
      params: params
      stuckFacet: stuckFacet
      stuckParam: stuckParam
      aggregations: aggregations

    collection.fetch
      data: params.toJSON()
      success: ->
        collection.trigger 'initial:fetch'

    { params: params, collection: collection, view: view }
