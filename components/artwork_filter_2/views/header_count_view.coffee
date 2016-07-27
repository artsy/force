Backbone = require 'backbone'
_ = require 'underscore'
aggregationsMap = require '../aggregations_map.coffee'
template = -> require('../templates/header_count_view.jade') arguments...

module.exports = class ArtworkFilterCountView extends Backbone.View

  initialize: ({ @params, @counts }) ->
    @listenToOnce @counts, 'change', @render
    @listenTo @params, 'change:for_sale', @render
    _.each @params.aggregationParamKeys, (param) =>
      @listenTo @params, "change:#{param}", @render

  render: ->
    forSaleTotal = @counts.forSaleTotal @params
    if @params.get('for_sale')
      allTotal = forSaleTotal
    else
      allTotal = @counts.allTotal @params

    @$el.html template { forSaleTotal, allTotal }
