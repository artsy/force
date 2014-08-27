_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
FilterStates = require '../collections/filter_states.coffee'
FilterState = require './filter_state.coffee'
Selected = require './selected.coffee'

module.exports = class Filter
  _.extend @prototype, Backbone.Events

  booleans:
    'for-sale': price_range: '-1:1000000000000'

  constructor: (options = {}) ->
    { @model } = options
    throw new Error 'Requires a model' unless @model?
    @selected = new Selected
    @filterStates = new FilterStates
    @root = @buildState()

  by: (key, value, options = {}) ->
    @engaged = true
    @selected.reset silent: true unless key is 'price_range'
    @selected.set key, value
    @newState options

  priced: ->
    pricedId = @booleanId 'for-sale'
    priced = @filterStates.get pricedId
    return priced if priced?
    return if @fetchingPriced
    @fetchingPriced = true
    filterState = new FilterState { id: pricedId }, modelId: @model.id
    filterState.fetch data: @booleans['for-sale'], success: (model, response, options) =>
      @fetchingPriced = false
      @filterStates.add model
      @trigger 'update:counts'
    false

  active: ->
    @__active__() or @root

  __active__: ->
    @filterStates.get(@stateId())

  get: ->
    @active().get arguments...

  boolean: (name) ->
    [key, value] = _.flatten(_.pairs(@booleans[name]))
    @get(key)?[value]

  buildState: ->
    new FilterState { id: @stateId() }, modelId: @model.id

  fetchState: (filterState, options = {}) ->
    @fetch filterState, options
    filterState

  newState: (options = {}) ->
    @fetchState @buildState(), options

  fetchRoot: (options = {}) ->
    @fetchState @root, options

  fetch: (filterState, options = {}) ->
    if state = @__active__()
      options.success? state
      @trigger 'all sync', state
      return
    @trigger 'all request'
    options.success = _.wrap options.success, (success, model, response, options) =>
      @filterStates.add filterState
      success? model, response, options
      @trigger 'all sync', model
    options.data ?= @selected.attributes
    filterState.fetch options

  stateId: ->
    qs.stringify(@selected.attributes) or 'root'

  booleanId: (name) ->
    qs.stringify @booleans[name]

  toggle: (name, boolean) ->
    if boolean
      @by _.flatten(_.pairs(@booleans[name]))...
    else
      @deselect _.first(_.keys(@booleans[name]))

  deselect: (key, options = {}) ->
    @selected.unset key
    @engaged = false unless _.keys(@selected.attributes).length
    @newState options

  reset: (options = {}) ->
    @engaged = false
    @selected.clear()
    @newState options
