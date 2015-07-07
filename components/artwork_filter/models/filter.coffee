_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
FilterStates = require '../collections/filter_states.coffee'
FilterState = require './filter_state.coffee'
Selected = require './selected.coffee'

module.exports = class Filter
  _.extend @prototype, Backbone.Events

  booleans:
    'for_sale': for_sale: 'true'

  sorts:
    '-published_at': 'Recently Added'
    '-year': 'Artwork Year (desc.)'
    'year': 'Artwork Year (asc.)'

  constructor: ({ @model } = {}) ->
    throw new Error 'Requires a model' unless @model?
    @selected = new Selected
    @filterStates = new FilterStates
    @root = @buildState()

  by: (keyOrObj, value, options = {}) ->
    @engaged = true
    @selected.reset silent: true unless keyOrObj is 'for_sale'
    @selected.set keyOrObj, value
    @newState options

  priced: ->
    pricedId = @booleanId 'for_sale'
    priced = @filterStates.get pricedId
    return priced if priced?
    return if @fetchingPriced
    @fetchingPriced = true
    filterState = new FilterState { id: pricedId }, artistId: @model.id
    filterState.fetch data: @booleans['for_sale'], success: (model, response, options) =>
      @fetchingPriced = false
      @filterStates.add model
      @trigger 'update:counts'
    false

  forSaleCount: ->
    (if @selected.has('for_sale') then @get('total').value else @get('for_sale')?.count) or 0

  active: ->
    @__active__() or @root

  __active__: ->
    @filterStates.get(@stateId())

  get: ->
    @active().get arguments...

  set: ->
    @active().set arguments...

  boolean: (name) ->
    [key, value] = _.flatten(_.pairs(@booleans[name]))
    @get(key)?[value]

  currentSort: ->
    @sorts[@selected.get('sort') or '-published_at']

  buildState: ->
    new FilterState { id: @stateId() }, artistId: @model.id

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
      @by name, boolean
    else
      @deselect name

  deselect: (key, options = {}) ->
    @selected.unset key
    @engaged = false unless _.keys(@selected.attributes).length
    @newState options

  reset: (options = {}) ->
    @engaged = false
    @selected.clear()
    @newState options
