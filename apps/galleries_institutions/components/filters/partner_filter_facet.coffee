Backbone = require 'backbone'
_ = require 'underscore'

module.exports = class PartnerFilterFacet extends Backbone.Model

  initialize: ({items, @facetName, @displayName, aggregations}) -> #
    @listenTo aggregations, "change:#{@facetName}", @updateSuggestions
    @allItemsSuggestion = name: 'All ' + @displayName
    @countItems = @defaultItems = _.map(items, (c) -> _.pick c, 'id', 'name')

  updateSuggestions: (aggregations, {countItems, total}) ->
    @allItemsSuggestion.count = total
    @countItems = _.map @defaultItems, (item) ->
      item = _.find(countItems, id: item.id,) || _.extend {count: 0}, item
      item.ignore = item.count is 0
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
