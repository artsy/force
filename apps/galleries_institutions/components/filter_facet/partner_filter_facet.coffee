Backbone = require 'backbone'
_ = require 'underscore'

module.exports = class PartnerFilterFacet extends Backbone.Model

  initialize: ({items, @facetName, @displayName, aggregations}) -> #
    @listenTo aggregations, "change:#{@facetName}", @updateSuggestions
    @allItemsSuggestion = name: 'All ' + @displayName
    @countItems = @defaultItems = _.map(items, (c) -> _.pick c, 'id', 'name')

  updateSuggestions: (aggregations, changed) ->
    return if not changed
    @allItemsSuggestion.count = changed.total
    @countItems = _.map @defaultItems, (item) ->
      item = _.find(changed.countItems, id: item.id,) || _.extend {count: 0}, item
      item

  matcher: (query, callback) =>
    possibleSuggestions = [@allItemsSuggestion].concat @countItems
    if query.length
      substrRegex = new RegExp(query, 'i');
      matches = _.select possibleSuggestions, ({name}) ->
        substrRegex.test name
    else
      matches = possibleSuggestions

    callback(matches);
