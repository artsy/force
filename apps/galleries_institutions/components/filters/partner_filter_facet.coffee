Backbone = require 'backbone'
_ = require 'underscore'

module.exports = class PartnerFilterFacet extends Backbone.Model

  initialize: ({items, @facetName, @displayName, params, aggregations}) -> #
    @listenTo params, "change:#{@facetName}", @updateSelection
    @listenTo params, 'firstLoad', -> @updateSelection(params, params.get(@facetName))
    @listenTo aggregations, "change:#{@facetName}", @updateCounts
    @set countItems: @defaultItems = _.map items, (c) -> _.pick c, 'id', 'name'

  updateCounts: (aggregations, {countItems, total}) ->
    @set
      total: total
      countItems: _.map @defaultItems, (item) ->
        _.find(countItems, id: item.id) || _.extend count: 0, item

  updateSelection: (params, id) ->
    return @unset 'selected' if not id
    @set selected: _.find(@defaultItems, id: id)

