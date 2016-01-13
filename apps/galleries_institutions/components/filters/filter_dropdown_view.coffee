Backbone = require 'backbone'
template = -> require('./filter_dropdown.jade') arguments...
_ = require 'underscore'

module.exports = class FilterDropdownView extends Backbone.View
  events:
    'mousedown .filter-partners-dropdown-list-container': (e) -> e.preventDefault()
    'mousedown .filter-partners-header .icon-chevron-down': (e) -> e.preventDefault()
    'click .js-partner-filter': 'filterSelected'
    'focus .filter-header-input': 'inputFocus'
    'blur .filter-header-input': 'inputBlur'
    'click .filter-partners-header .icon-chevron-down': 'dropdownClick'

  initialize: ({ @params, @facet }) ->
    @listenTo @params, 'firstLoad', @firstLoad
    @listenTo @facet, 'change:countItems change:selected', @render

  render: ->
    @$el.html template @facet.pick('displayName', 'selected', 'countItems', 'total')

  inputFocus: (e) ->
    e.preventDefault()
    $target = $(e.target)
    $target.attr('placeholder', 'Search ' + @facet.displayName)
    @$el.attr('data-state', 'expanded');

  inputBlur: (e) ->
    e.preventDefault()
    $target = $(e.target)
    $target.attr('placeholder', @facet.get('selected')?.name or 'All ' + @facet.displayName)
    @$el.attr('data-state', '');

  dropdownClick: (e) ->
    $input = @$('.filter-header-input')
    if $input.is(":focus")
      $input.blur()
    else
      $input.focus()

  filterSelected: (e) ->
    e.preventDefault()
    $target = $(e.target)
    return if $target.hasClass('is-disabled')

    if (value = $target.attr 'data-id')
      @params.set @facet.facetName, value
    else
      @params.unset @facet.facetName

