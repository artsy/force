_ = require 'underscore'
sd = require('sharify').data
qs = require 'querystring'
bootstrap = require '../../components/layout/bootstrap'
Backbone = require 'backbone'
{ Tag } = require '../../models/tag'
{ Artworks } = require '../../collections/artworks'
artworkColumnsTemplate = -> require('../../components/artwork_columns/template.jade') arguments...

module.exports.TagArtworksView = class TagArtworksView extends Backbone.View

  initialize: (options) ->
    { @params } = options
    @page = 1
    @collection.on 'sync', @render
    @setupInfiniteScroll()
    @$activePrice = @$ ".filter-dropdown[data-group='price_range'] .filter-dropdown-active"
    @collection.fetch
      data: @params

  setupInfiniteScroll: ->
    $.onInfiniteScroll =>
      return if @finishedScrolling
      @page++
      @collection.fetch
        data: _.extend(@params, page: @page)
        remove: false
        success: (artworks, res) =>
          if res.length is 0
            @$('#tag-artworks-spinner').hide()
            @finishedScrolling = true

  render: =>
    @selectActiveFilters()
    if @collection.length > 0
      @$('#tag-artworks-list').html artworkColumnsTemplate artworkColumns: @collection.groupByColumnsInOrder()
      @$('#tag-artworks-empty-message').hide()
    else
      @$('#tag-artworks-empty-message').show()
    @$('.filter-dropdown .nav').width(@$el.width())

  # If no params for a given filter, select the first (which should be all)
  selectActiveFilters: ->
    @$('.filter-dropdown a.is-active').removeClass 'is-active'
    if @params.price_range
      $activeEl = @$ "a[data-val='#{@params.price_range}']"
    else
      $activeEl = @$ "a[data-attr='price_range']:first-child"
    @$activePrice.text($activeEl.text()).css 'visibility', 'visible'
    $activeEl.addClass 'is-active'

  events:
    'click .filter-dropdown': 'onFilterTriggerClick'
    'click .filter-dropdown a': 'onFilterClick'

  onFilterTriggerClick: (event) ->
    $dropdown = $(event.target).closest('.filter-dropdown')

    # Is there another active dropdown?
    for activeDropdown in @$('.filter-dropdown.is-active')
      $activeDropdown = $(activeDropdown)
      if $activeDropdown.data('group') isnt $dropdown.data('group')
        $activeDropdown.removeClass 'is-active'
    $dropdown.toggleClass 'is-active'
    false

  # This will refresh the page / update the URL for filter updates
  onFilterClick: (event) ->
    $link = $(event.target)
    return false if $link.is '.is-active'
    @params[$link.data('val')] = $link.data 'val'
    delete @params.page
    location.href = "#{location.pathname}?#{qs.stringify @params}"
    false

module.exports.init = ->
  bootstrap()
  tag = new Tag sd.TAG
  artworks = new Artworks()
  artworks.url = "#{sd.API_URL}/api/v1/search/filtered/tag/#{tag.get('id')}"
  new TagArtworksView
    collection: artworks
    el: $ 'body'
    model: tag
    params: sd.PARAMS
