_ = require 'underscore'
Backbone = require 'backbone'
Filter = require './models/filter.coffee'
Artworks = require '../../collections/artworks.coffee'
ArtworkColumnsView = require '../artwork_columns/view.coffee'
{ API_URL } = require('sharify').data
template = -> require('./templates/index.jade') arguments...
filterTemplate = -> require('./templates/filter.jade') arguments...
headerTemplate = -> require('./templates/header.jade') arguments...

class Params extends Backbone.Model
  defaults: size: 9, page: 1
  next: ->
    @set page: @get('page') + 1
  prev: ->
    @set page: @get('page') - 1

module.exports = class ArtworkFilterView extends Backbone.View
  events:
    'click .artwork-filter-select': 'selectCriteria'
    'click .artwork-filter-remove': 'removeCriteria'
    'click input[type="checkbox"]': 'toggleBoolean'
    'click #artwork-see-more': 'loadNextPage'

  initialize: ->
    @artworks = new Artworks
    @artworks.url = "#{API_URL}/api/v1/search/filtered/artist/#{@model.id}"
    @filter = new Filter model: @model
    @params = new Params

    @listenTo @artworks, 'all', @handleArtworksState
    @listenTo @artworks, 'sync', @renderColumns
    @listenTo @filter, 'all', @handleFilterState
    @listenTo @filter, 'sync update:counts', @renderFilter
    @listenTo @filter, 'sync', @renderHeader
    @listenTo @filter.selected, 'change', @fetchArtworksFromBeginning
    @listenTo @filter.selected, 'change', @scrollToTop

    @fetchArtworks()
    @render()

  scrollToTop: ->
    @$htmlBody ?= $('html, body')
    @$siteHeader ?= $('#main-layout-header')
    visibleTop = @$el.offset().top - @$siteHeader.height()
    @$htmlBody.animate { scrollTop: visibleTop }, 500

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
    @params.next()
    @fetchArtworks error: => @params.prev()

  fetchArtworks: (options = {}) ->
    options.data = _.extend {}, @filter.selected.attributes, @params.attributes
    @artworks.fetch options

  fetchArtworksFromBeginning: ->
    @params.clear().set(@params.defaults)
    @fetchArtworks()

  cacheSelectors: ->
    @$columns = @$('#artwork-columns')
    @$filter = @$('#artwork-filter')
    @$button = @$('#artwork-see-more')
    @$header = @$('#artwork-columns-header')

  postRender: ->
    @cacheSelectors()

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
    if @params.get('page') > 1
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

  displayFilter: ->
    (if @filter.selected.has('price_range') then @filter.priced() else @filter.root) or @filter.root

  renderFilter: ->
    @$filter.html(filterTemplate filter: @filter, displayFilter: @displayFilter())
    @setState()

  render: ->
    @$el.html template()
    @postRender()
    this
