_ = require 'underscore'
Backbone = require 'backbone'
FilterArtworks = require '../../../collections/filter_artworks.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'

template = -> require('./template.jade') arguments...

module.exports = class DropdownView extends Backbone.View

  events:
    'click a[data-attr]': 'onSelect'

  initialize: ({@collection, @params, @facet, @el, @facets}) ->
    @listenTo @collection, 'initial:fetch', @updateCounts
    @listenTo @params, "change:#{@facet}", @renderActiveParam

    for facet in @facets
      @listenTo @params, "change:#{facet}", @updateCounts

  updateCounts: ->
    # we need a copy of the params without this facet and
    # we don't need results, just counts
    clonedParams = @params.clone().unset(@facet).set { size: 0, page: 1 }
    updatedCounts = new FilterArtworks
    updatedCounts.fetch
      data: clonedParams.toJSON()
      success: @renderCounts

  renderCounts: (collection) =>
    counts = collection.counts[@facet]
    activeText = counts[@params.get(@facet)]?.name

    html = template
      filter: counts
      name: @facet
      filterRoot:  sd.FILTER_ROOT
      params: @params
      activeText: activeText

    old = @$el
    @setElement html
    old.replaceWith @$el
    @delegateEvents()

  onSelect: (e) ->
    if (val = $(e.currentTarget).data 'val') is ''
      @params.unset @facet
    else
      @params.set @facet, val

    analyticsHooks.trigger 'artwork_filter:activated', { attr: @facet, value: val }

    false
