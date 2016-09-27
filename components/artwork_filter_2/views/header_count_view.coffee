Backbone = require 'backbone'
_ = require 'underscore'
aggregationsMap = require '../aggregations_map.coffee'
template = -> require('../templates/header_count_view.jade') arguments...

module.exports = class ArtworkFilterCountView extends Backbone.View

  initialize: ({ @params, @counts }) ->
    @listenTo @counts, 'change', @render
    @listenTo @params, 'change:for_sale', @render

  render: ->
    forSaleCount = @counts.get 'for_sale'
    unless @params.get('for_sale')
      allCount = @counts.get 'all'

    @$el.html template { forSaleCount, allCount }
