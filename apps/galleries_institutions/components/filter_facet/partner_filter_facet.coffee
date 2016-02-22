Backbone = require 'backbone'
_ = require 'underscore'

module.exports = class PartnerFilterFacet extends Backbone.Model

  initialize: ({allItems, @emptyStateItemIDs, @facetName, @displayName, aggregations}) -> #
    @listenTo aggregations, "change:#{@facetName}", @updateSuggestions
    @allItemsSuggestion = name: 'All ' + @displayName
    @countItems = @allItems = _.map(allItems, (c) -> _.pick c, 'id', 'name')
    @emptyStateItemIDs ?= _.pluck @allItems, 'id'

  updateSuggestions: (aggregations, changed) ->
    return if not changed
    @allItemsSuggestion.count = changed.total

    # Exclude items that were not specified in `allItems`.
    # Default count to zero for items that were not included in the response.
    @countItems = _.map @allItems, (item) ->
      _.find(changed.countItems, id: item.id) || _.extend {count: 0}, item

  matcher: (query, callback) =>
    if query.length
      substrRegex = new RegExp(query, 'i');
      matches = [@allItemsSuggestion].concat _.select @countItems, ({name}) ->
        substrRegex.test name
    else
      matches = [@allItemsSuggestion].concat _.select @countItems, ({id}) =>
        id in @emptyStateItemIDs

    callback(matches);
