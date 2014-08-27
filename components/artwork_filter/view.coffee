_ = require 'underscore'
Backbone = require 'backbone'
Filter = require './models/filter.coffee'
ArtworkColumns = require './collections/artwork_columns.coffee'
ArtworkColumnsView = require '../artwork_columns/view.coffee'
tick = require '../util/tick.coffee'
template = -> require('./templates/index.jade') arguments...
filterTemplate = -> require('./templates/filter.jade') arguments...
headerTemplate = -> require('./templates/header.jade') arguments...

module.exports = class ArtworkFilterView extends Backbone.View
  events:
    'click .artwork-filter-select': 'selectCriteria'
    'click .artwork-filter-remove': 'removeCriteria'
    'click input[type="checkbox"]': 'toggleBoolean'
    'click #artwork-see-more': 'loadNextPage'

  initialize: ->
    @artworks = new ArtworkColumns [], modelId: @model.id
    @filter = new Filter model: @model

    @listenTo @artworks, 'all', @handleArtworksState
    @listenTo @artworks, 'sync', @renderColumns
    @listenTo @filter, 'all', @handleFilterState
    @listenTo @filter, 'sync update:counts', @renderFilter
    @listenTo @filter, 'sync', @renderHeader
    @listenTo @filter.selected, 'change', @fetchArtworksFromBeginning
    @listenTo @filter.selected, 'change', @scrollToTop

    @initialStickyFilterSetup = _.once @setupStickyFilter

    @render()
    @filter.fetchRoot()
    @fetchArtworks()

  scrollToTop: ->
    @$htmlBody ?= $('html, body')
    visibleTop = @$el.offset().top - @$siteHeader.height()
    @$htmlBody.animate { scrollTop: visibleTop - 1 }, 500

  handleState: (el, eventName) ->
    if state = { request: 'loading', sync: 'loaded', error: 'loaded' }[eventName]
      el?.attr 'data-state', state
      state
  handleFilterState: (eventName) ->
    @handleState @$filter, eventName
  handleArtworksState: (eventName) ->
    state = @handleState @$columns, eventName
    @$button?.attr 'data-state', state if state

  toggleBoolean: (e) ->
    $target = $(e.currentTarget)
    @filter.toggle $target.attr('name'), $target.prop('checked')
    @trigger 'navigate'

  loadNextPage: ->
    @artworks.nextPage data: @filter.selected.toJSON()

  fetchArtworks: ->
    @artworks.fetch data: @filter.selected.toJSON()

  fetchArtworksFromBeginning: ->
    @artworks.fetchFromBeginning data: @filter.selected.toJSON()

  cacheSelectors: ->
    @$window = $(window)
    @$siteHeader = $('#main-layout-header')
    @$columnsSection = @$('#artwork-columns-section')
    @$columns = @$('#artwork-columns')
    @$filter = @$('#artwork-filter')
    @$button = @$('#artwork-see-more')
    @$header = @$('#artwork-columns-header')

  postRender: ->
    @cacheSelectors()

  setupStickyFilter: ->
    @onResize()
    @setupPositionHelpers()
    @listenTo @artworks, 'sync', (-> _.defer @onScroll)
    @$window
      .on 'scroll.filter', tick(@onScroll)
      .on 'resize.filter', tick(@onResize)

  getStaticPositions: ->
    @sp =
      headerHeight: @$siteHeader.height()
      visibleArea: @$window.height() - @$siteHeader.height()

  onResize: =>
    @getStaticPositions()

    if @$filter.height() > @sp.visibleArea
      @lockDisabled = true
      @$filter.attr 'data-position', 'default'
    else
      @lockDisabled = false

  setupPositionHelpers: ->
    @dp =
      columnsTop: => @$columnsSection.offset().top
      columnsBottom: => @dp.columnsTop() + @$columnsSection.height()
      filterBottom: => @$filter.offset().top + @$filter.height()
      filterFromBottom: => @dp.columnsBottom() - @$filter.height()
      aboveColumns: (top) => top < @dp.columnsTop()
      insideColumns: (top) => top <= @dp.filterFromBottom() and top >= @dp.columnsTop()
      belowColumns: (top) => (top + @$filter.height()) >= @dp.columnsBottom()

  onScroll: =>
    return if @lockDisabled

    top = @$window.scrollTop() + @sp.headerHeight

    if @filterPosition is 'stuck' and @filterPosition isnt 'docked' and @dp.belowColumns(top)
      @filterPosition = 'docked'
      @$filter.attr 'data-position', 'docked'

    else if @filterPosition isnt 'stuck' and @dp.insideColumns(top)
      @filterPosition = 'stuck'
      @$filter.attr 'data-position', 'stuck'

    else if @filterPosition isnt 'default' and @dp.aboveColumns(top)
      @filterPosition = 'default'
      @$filter.attr 'data-position', 'default'

  selectCriteria: (e) ->
    e.preventDefault()
    $target = $(e.currentTarget)
    @filter.by $target.data('key'), $target.data('value')
    @trigger 'navigate'

  removeCriteria: (e) ->
    e.preventDefault()
    @filter.deselect $(e.currentTarget).data('key')
    @trigger 'navigate'

  setState: ->
    @setButtonState()

  setButtonState: ->
    length = @columns?.length() or 0
    remaining = @filter.active.get('total') - length
    visibility = if length >= @filter.active.get('total') then 'hide' else 'show'
    @$button.text("See More (#{remaining})")[visibility]()

  renderHeader: ->
    @$header.html headerTemplate(filter: @filter, artist: @model)

  renderColumns: ->
    if @artworks.params.get('page') > 1
      @columns.appendArtworks @artworks.models
    else
      @columns?.stopListening()
      @columns = new ArtworkColumnsView
        el: @$columns
        collection: @artworks
        numberOfColumns: 3
        gutterWidth: 40
        maxArtworkHeight: 400
        isOrdered: false
        seeMore: false
        allowDuplicates: true
        artworkSize: 'tall'
    @setState()

  pricedFilter: ->
    (if @filter.selected.has('price_range') then @filter.priced() else @filter.root) or @filter.root

  forSaleCount: ->
    count = if @filter.selected.has('price_range')
      @filter.active.get('total')
    else
      @filter.active.boolean('for-sale')
    count or 0

  renderFilter: ->
    @$filter.html filterTemplate
      filter: @filter
      pricedFilter: @pricedFilter()
      forSaleCount: @forSaleCount()
    @setState()
    @initialStickyFilterSetup()

  render: ->
    @$el.html template()
    @postRender()
    this
