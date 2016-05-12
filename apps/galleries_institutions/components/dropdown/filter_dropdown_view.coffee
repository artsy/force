Backbone = require 'backbone'
_ = require 'underscore'
suggestionTemplate = -> require('./suggestion.jade') arguments...

module.exports = class FilterDropdownView extends Backbone.View
  events:
    'focus .partners-facet-input': 'inputFocus'
    'blur .partners-facet-input': 'inputBlur'
    'mousedown .icon-chevron-down': (e) -> e.preventDefault()
    'click .icon-chevron-down': 'dropdownClick'

  initialize: ({ @params, @facet }) ->
    @$input = @$('.partners-facet-input')
    source = if @facet.search then _.debounce(@facet.async_matcher, 500) else @facet.matcher
    @$input.typeahead({
      hint: false
      highlight: true,
      minLength: 0
    }, {
      name: @facet.facetName
      source: source
      displayKey: 'name'
      template: 'custom'
      templates:
        suggestion: @suggestionTemplate
        empty: -> '' # Typeahead won't render the header for empty results unless 'empty' is defined
    })
    @listenTo @params, 'firstLoad', -> @setPlaceholder false
    @listenTo @params, "change:#{@facet.facetName}", -> @setPlaceholder false
    @typeahead = @$input.data('ttTypeahead')

    @$('.tt-dataset-category').on('click', '.tt-suggestion', @suggestionClicked)

    # Annoying workaround to prevent Twitter Typeahead from selecting a suggestion with no results
    @$input.on('typeahead:selected', @selected)

  suggestionClicked: (e) =>
    suggestion = @typeahead.dropdown.getDatumForSuggestion($(e.currentTarget)).raw
    e.stopPropagation() if 'count' of suggestion and suggestion.count == 0

  selected: (e, suggestion, dataset) =>
    if suggestion.id
      if @facet.search
        @goToProfile suggestion.profile.href
      else
        @params.set @facet.facetName, suggestion.id
    else
      @params.unset @facet.facetName

    $(e.target).blur()

  goToProfile: (profileUrl) ->
    window.location.href = profileUrl

  suggestionTemplate: (item) ->
    suggestionTemplate item: item

  dropdownClick: (e) ->
    if @$input.is(":focus")
      @$input.blur()
    else
      @$input.focus()

  inputFocus: (e) ->
    @setPlaceholder true
    # Make the suggestions render immediately
    @typeahead.input.trigger('queryChanged', '')

  inputBlur: (e) ->
    @$input.typeahead('val', '')
    @setPlaceholder false

  setPlaceholder: (hasFocus) ->
    id = @params.get(@facet.facetName)
    if hasFocus
      placeholder = 'Search ' + @facet.displayName
    else if id
      placeholder = @currentSelectionName()
    else
      placeholder = @facet.allItemsSuggestion.name

    if id
      @$input.removeClass('no-selection')
    else
      @$input.addClass('no-selection')

    @$input.attr('placeholder', placeholder)

  currentSelectionName: ->
     _.find(@facet.countItems, id: @params.get(@facet.facetName))?.name

  remove: ->
    @$('.tt-dataset-category').off('click', '.tt-suggestion', @suggestionClicked)
    @$input.off('typeahead:selected', @selected)
    @$input.typeahead 'destroy'
    super()

