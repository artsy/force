{ invoke, extend } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class QuasiInfiniteView extends Backbone.View
  subViews: []

  selectors:
    collection: '.js-settings-quasi-infinite__collection'
    more: more = '.js-settings-quasi-infinite__more__button'

  events:
    "click #{more}": 'nextPage'

  initialize: ({ @user } = {}) ->
    throw new Error '@kind' unless @kind?
    throw new Error '@params' unless @params?
    throw new Error '@collection' unless @collection?

    @tally = new Backbone.Collection

    @listenTo @tally, 'add remove', @updateCounts
    @listenTo @params, 'change:page', @fetch
    @listenTo @params, 'change:page', @indicateLoading
    @listenTo @collection, 'sync', @concealLoading
    @listenTo @collection, 'sync', @render
    @listenTo @collection, 'sync', @tripInfinite
    @listenTo @collection, 'sync', @updateWaypoints
    @listenTo @collection, 'sync', @detectEnd

  tripInfinite: ->
    if @params.get('page') is 2
      @$el.waypoint (direction) =>
        @nextPage() if direction is 'down'
      , offset: 'bottom-in-view'

  updateWaypoints: ->
    $.waypoints 'refresh'

  detectEnd: ->
    if @remaining is 0
      @$(@selectors.more).remove()
      $.waypoints 'destroy'

  indicateLoading: ->
    @$(@selectors.more)
      .attr 'data-state', 'loading'

  fetch: ->
    @collection.fetch
      data: @params.toJSON()
      success: (collection, response) =>
        @tally.add response

  nextPage: (e) ->
    e?.preventDefault()
    @params.set page: @params.get('page') + 1

  updateCounts: ->
    @total = parseInt @collection.totalCount or 0
    @remaining = @total - @tally.length
    @remaining = 0 if @remaining < 0

    total: @total
    remaining: @remaining

  render: ->
    @__$collection__ = @$(@selectors.collection).detach()

    @$el.html template extend {}, @updateCounts(),
      collection: @collection
      kind: @kind

    if @__$collection__.length
      @$(@selectors.collection)
        .replaceWith @__$collection__

    @postRender()
    this

  postRender: -> #

  remove: ->
    invoke @subviews, 'remove'
    $.waypoints 'destroy'
    super
