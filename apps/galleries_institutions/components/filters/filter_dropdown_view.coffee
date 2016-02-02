Backbone = require 'backbone'
_ = require 'underscore'
template = -> require('./filter_dropdown.jade') arguments...
suggestionTemplate = -> require('./suggestion.jade') arguments...

module.exports = class FilterDropdownView extends Backbone.View
  events:
    'focus .filter-header-input': 'inputFocus'
    'blur .filter-header-input': 'inputBlur'
    'mousedown .icon-chevron-down': (e) -> e.preventDefault()
    'click .icon-chevron-down': 'dropdownClick'

  initialize: ({ @params, @facet }) ->
    @$input = @$('.filter-header-input')
    @$input.typeahead({
      hint: false
      highlight: true,
      minLength: 0
    }, {
      name: @facet.facetName
      source: @facet.matcher
      displayKey: 'name'
      template: 'custom'
      templates:
        suggestion: @suggestionTemplate
        empty: -> "<p>Empty</p>" # Typeahead won't render the header for empty results unless 'empty' is defined
    })

    @listenTo @params, 'firstLoad', @firstLoad

    @typeahead = @$input.data().ttTypeahead

    @$('.tt-dataset-category').on('click', '.tt-suggestion', @suggestionClicked)

    @$input.bind('typeahead:selected', @selected)

  firstLoad: (params) =>
    @setPlaceholderToCurrentItem()

  suggestionClicked: (e) =>
    datum = @typeahead.dropdown.getDatumForSuggestion($(e.currentTarget))
    e.stopPropagation() if datum.raw.ignore

  selected: (e, suggestion, dataset) =>
    if suggestion.id
      @params.set @facet.facetName, suggestion.id
    else
      @params.unset @facet.facetName

    $(e.target).blur()

  suggestionTemplate: (item) ->
    suggestionTemplate item: item

  dropdownClick: (e) ->
    if @$input.is(":focus")
      @$input.blur()
    else
      @$input.focus()

  inputFocus: (e) ->
    e.preventDefault()
    $target = $(e.target)
    $target.data().ttTypeahead.input.trigger('queryChanged', '')
    $target.attr('placeholder', 'Search ' + @facet.displayName)

  inputBlur: (e) ->
    e.preventDefault()
    $target = $(e.target)
    $target.typeahead('val', '')
    @setPlaceholderToCurrentItem()

  setPlaceholderToCurrentItem: ->
    id = @params.get(@facet.facetName)
    if id
      @$input.removeClass('no-selection')
      item = _.find @facet.countItems, id: id
    else
      @$input.addClass('no-selection')
      item = @facet.allItemsSuggestion

    @$input.attr('placeholder', item.name)



