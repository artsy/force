Backbone = require 'backbone'
_ = require 'underscore'
_s = require 'underscore.string'
FetchFilterPartners = require '../parameters/fetch_filter_partners.coffee'
AsciiFolder = require '../../../../components/util/ascii_folder.coffee'

module.exports = class PartnerFilterFacet extends Backbone.Model

  initialize: ({allItems, @emptyStateItemIDs, @facetName, @displayName, aggregations, @params, @search}) -> #
    @listenTo aggregations, "change:#{@facetName}", @updateSuggestions
    @allItemsSuggestion = name: 'All ' + @displayName
    @countItems = @allItems = _.map(allItems, (c) -> _.pick c, 'id', 'name')
    @emptyStateItemIDs ?= _.pluck @allItems, 'id'
    @search ?= false

  updateSuggestions: (aggregations, changed) ->
    return if not changed
    @allItemsSuggestion.count = changed.total

    # Exclude items that were not specified in `allItems`.
    # Default count to zero for items that were not included in the response.
    @countItems = _.map @allItems, (item) ->
      _.find(changed.countItems, id: item.id) || _.extend {count: 0}, item

  matcher: (query, callback) =>
    if query.length
      matches = [@allItemsSuggestion].concat _.select @countItems, ({name}) =>
        @isMatched(query, name)
    else
      matches = [@allItemsSuggestion].concat _.select @countItems, ({id}) =>
        id in @emptyStateItemIDs

    callback(matches)

  isMatched: (query, string) ->
    escape= (s) ->
      s.replace /[-\/\\^$*+?.()|[\]{}]/g, '\\$&'

    query = AsciiFolder.fold(query)
    regex = _s.clean(escape(query)).replace(' ', '\\W* \\W*')
    substrRegex = new RegExp(regex, 'i')
    substrRegex.test AsciiFolder.fold(string)

  async_matcher: (query, callback) =>
    if query.length
      fetchFilterPartners = new FetchFilterPartners params: @params, term: query
      fetchFilterPartners.fetch()
        .then ->
          callback(fetchFilterPartners.partners)
    else
      # return empty list if query is empty
      callback([])
