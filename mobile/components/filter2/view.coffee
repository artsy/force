_ = require 'underscore'
_s = require 'underscore.string'
qs = require 'querystring'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
bootstrap = require '../../components/layout/bootstrap.coffee'
PoliteInfiniteScrollView = require '../../components/polite_infinite_scroll/client/view.coffee'
DropdownView = require './dropdown/view.coffee'
HeadlineView = require './headline/view.coffee'
template = -> require('./template.jade') arguments...
artworkColumnsTemplate = -> require('../../components/artwork_columns/template.jade') arguments...

module.exports = class FilterView extends PoliteInfiniteScrollView
  labelMap:
    'medium': 'Medium'
    'price_range': 'Price range'

  events:
    'click .is-show-more-button' : 'startInfiniteScroll'

  initialize: ({ @params, @stuckFacet, @stuckParam, @aggregations })->
    @listenTo @collection, 'initial:fetch', @render
    @listenTo @collection, 'sync', @onSync
    @listenTo mediator, 'select:changed', @setParams

    @facets = _.keys @labelMap

    for facet in @facets
      @listenTo @params, "change:#{facet}", @reset

  render: ->
    @$el.html template()
    @postRender()
    this

  postRender: ->
    @onInitialFetch()
    @renderCounts()
    @renderDropdowns()
    @setupHeadline()

  setupHeadline: ->
    new HeadlineView
      collection: @collection
      params: @params
      stuckParam: @stuckParam
      stuckFacet: @stuckFacet
      facets: @facets
      el: @$('.artwork-filter-sentence')

  reset: ->
    @params.set({ page: 1 }, { silent: true })

    @collection.fetch
      data: @params.toJSON()
      reset: true
      success: =>
        @renderCounts()
        @onSync()

  setParams: ({name, value}) ->
    if value is 'all'
      @params.unset name
    else
      @params.set name, value
      if name == 'price_range' && location.pathname.includes '/collect'
        analyticsHooks.trigger('commercialFilterPrice:triggered', { price_range: value })

  renderDropdowns: ->
    for name, options of _.pick @collection.counts, _.keys @labelMap
      dropdownView = new DropdownView
        name: name
        label: @labelMap[name]
        filterOptions: options
        filterParam: name
        sort: "All"

      @$('.artwork-filter-dropdowns').append dropdownView.render().$el

  onInfiniteScroll: ->
    return if @finishedScrolling
    @params.set 'page', @params.get('page') + 1
    @collection.fetch
      data: @params.toJSON()
      remove: false
      success: (artworks, res) =>
        @onFinishedScrolling() if res.length is 0

  totalCount: ->
    _s.numberFormat @collection.counts.total.value

  renderCounts: ->
    work = if @totalCount() is "1" then 'Work' else 'Works'
    @$('.artwork-filter-counts').text "#{@totalCount()} #{work}"

  onSync: =>
    if @collection.length > 0
      @$('.artwork-filter-list').html artworkColumnsTemplate artworkColumns: @collection.groupByColumnsInOrder()
      @$('.artwork-filter-empty-message').hide()
    else
      @$('.artwork-filter-empty-message').show()
