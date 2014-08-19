_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Selected = require './selected.coffee'

sectionMap =
  related_gene: 'Category'
  medium: 'Medium'
  gallery: 'Gallery'
  institution: 'Institution'
  period: 'Time Period'

module.exports = class Filter extends Backbone.Model
  url: ->
    "#{API_URL}/api/v1/search/filtered/artist/#{@id}/suggest"

  booleans:
    'for-sale': ['price_range', '-1:1000000000000']

  initialize: (attributes, options = {}) ->
    { @id } = options
    throw new Error 'Requires an ID' unless @id?
    @selected = new Selected
    @history = new Backbone.Collection

  by: (key, value, options = {}) ->
    @bySansFetch arguments...
    @fetch _.extend options, data: @selected.attributes

  bySansFetch: (key, value, options = {}) ->
    @engaged = true
    @selected.set key, value

  criteria: ->
    _.reduce _.keys(@attributes), (criteria, x) =>
      if sectionMap[x] and not _.isEmpty(@get x)
        criteria[x] =
          label: sectionMap[x]
          filters: @sortFilters(x, _.map @get(x), (count, key) =>
            key: key, count: count, label: @humanize(key)
          )
      criteria
    , {}

  sortFilters: (key, filters) ->
    # Leave period filters in chronological order
    return filters if key is 'period'
    # Sort the rest by their count
    _.sortBy(filters, 'count').reverse()

  boolean: (name) ->
    @get(@booleans[name][0])[@booleans[name][1]]

  humanize: (string) ->
    _s.titleize _s.humanize string

  toggle: (name, boolean) ->
    if boolean
      @by @booleans[name]...
    else
      @deselect @booleans[name][0]

  deselect: (key, options = {}) ->
    @selected.unset key
    @engaged = false unless _.keys(@selected.attributes).length
    @fetch _.extend options, data: @selected.attributes

  reset: (options = {}) ->
    @engaged = false
    @selected.clear()
    @fetch options

  fetch: (options = {}) ->
    id = _.map(options.data, (v, k) -> "#{k}=#{v}").join '&'
    state = @history.get id
    if state?
      @clear().set data = state.get 'data'
      options.success? this, data
      @trigger 'sync', this, data
      return
    options.success = _.wrap options.success, (success, model, response, options) =>
      @history.add id: id, data: model.toJSON()
      success? model, response, options
    super
