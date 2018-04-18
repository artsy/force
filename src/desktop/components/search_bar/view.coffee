_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
sd = require('sharify').data
Search = require './collections/search.coffee'
mediator = require '../../lib/mediator.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'
{ modelNameAndIdToLabel } = require '../../lib/analytics_helpers.coffee'
itemTemplate = -> require('./templates/item.jade') arguments...
emptyItemTemplate = -> require('./templates/empty-item.jade') arguments...

module.exports = class SearchBarView extends Backbone.View
  defaults:
    limit: 4
    autoselect: false
    displayKind: true
    displayEmptyItem: false
    shouldDisplaySuggestions: true

  initialize: (options) ->
    return unless @$el.length
    { @mode,
      @restrictType,
      @$input,
      @fairId,
      @includePrivateResults,
      @limit,
      @autoselect,
      @displayKind,
      @displayEmptyItem,
      @centeredHomepageSearch
      @shouldDisplaySuggestions } = _.defaults options, @defaults

    @$input ?= @$('input')
    throw new Error('Requires an input field') unless @$input?

    @search = new Search restrictType: @restrictType, mode: @mode, fairId: @fairId, size: @limit

    @on 'search:start', @indicateLoading
    @on 'search:complete', @concealLoading
    @on 'search:complete', @maybeHighlight
    @on 'search:complete', @displayFeedback
    @on 'search:opened', @displaySuggestions
    @on 'search:closed', @hideSuggestions
    @on 'search:cursorchanged', @ensureResult

    @setupTypeahead()
    @setupPlaceholder()

  events:
    'keyup input': 'checkSubmission'
    'focus input': 'trackFocusInput'
    'click .empty-item': 'emptyItemClick'
    'click #main-layout-search-bar-icon': 'iconClick'

  iconClick: (e) ->
    if @isEmpty()
      @$input.focus()
    else
      @emptyItemClick()

  trackFocusInput: ->
    analyticsHooks.trigger 'search:focus'

  checkSubmission: (e) ->
    @hideSuggestions()
    return if !(e.which is 13) or @selected?

    unless @isEmpty()
      @trigger 'search:entered', encodeURIComponent(@$input.val())

  indicateLoading: ->
    @renderFeedback()
    @$el.addClass 'is-loading'

  concealLoading: ->
    @$el.removeClass 'is-loading'

  ensureResult: (e, result) ->
    @set @query unless result

  # Adds a highlight class if autoselect is true
  # (rather than actually moving the cursor down
  # which would overwrite the user's typing)
  maybeHighlight: ->
    @$('.tt-suggestion:first').addClass('tt-cursor') if @autoselect

  feedbackString: ->
    @__feedbackString__ ?= if @mode? and @mode isnt 'suggest'
      "Search for #{_s.titleize(@mode)}…"
    else
      'Search Artsy'

  displayFeedback: ->
    @hideSuggestions() if @search.results.length

  renderFeedback: (feedback) ->
    (@$feedback ?= @$('.autocomplete-feedback'))
      .text feedback or @feedbackString()

  isEmpty: ->
    _.isEmpty(_s.trim(@$input.val()))

  displaySuggestions: ->
    return if @isEmpty() and @centeredHomepageSearch
    if @isEmpty() and @shouldDisplaySuggestions
      @renderFeedback()
      @$el.addClass 'is-display-suggestions'

  hideSuggestions: ->
    @$el.removeClass 'is-display-suggestions'

  suggestionTemplate: (item) =>
    itemTemplate item: item, displayKind: @displayKind

  emptyItemTemplate: (options) =>
    if @displayEmptyItem
      emptyItemTemplate query: decodeURIComponent(options.query)

  announceQuery: (query) ->
    mediator.trigger 'search:doge' if query is 'doge'
    mediator.trigger 'search:skrillex' if query is 'skrillex'

  trackSearchResults: (results) ->
    string = "Searched from header, with #{if results?.length then 'results' else 'no results'}"
    analyticsHooks.trigger 'search:header',
      message: string
      query: @$input.val()

  setupBloodHound: ->
    @hound = new Bloodhound
      limit: @limit
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace 'value'
      queryTokenizer: Bloodhound.tokenizers.whitespace
      remote:
        url: @search.url()
        filter: (results) =>
          @trackSearchResults results
          @search.parse results
        ajax:
          beforeSend: (xhr) =>
            xhr.setRequestHeader 'X-XAPP-TOKEN', sd.ARTSY_XAPP_TOKEN
            @trigger 'search:start', xhr
          complete: (xhr) =>
            @query = encodeURIComponent @$input.val()
            @trigger 'search:complete', xhr
            @announceQuery @query
    @hound.initialize()
    @hound

  setupTypeahead: ->
    _.each ['opened', 'closed', 'selected', 'cursorchanged'], (action) =>
      @$input.on "typeahead:#{action}", (args...) =>
        @trigger "search:#{action}", args...

    @$input.typeahead { autoselect: @autoselect },
      template: 'custom'
      templates:
        suggestion: @suggestionTemplate
        empty: -> "" # Typeahead won't render the header for empty results unless 'empty' is defined
        header: @emptyItemTemplate
      displayKey: 'value'
      name: _.uniqueId 'search'
      source: @setupBloodHound().ttAdapter()

  clear: ->
    @set ''

  set: (value) ->
    @$input.typeahead 'val', decodeURIComponent value

  emptyItemClick: ->
    analyticsHooks.trigger 'search:empty-item:click',
      query: @query
      item_number: 0
      item_type: 'search'
      destination_path: "#{sd.APP_URL}/search?q=#{@query}"
    @selected = true
    location.assign "/search?q=#{@query}"

  selectResult: (e, model) ->
    return @emptyItemClick() unless model
    analyticsHooks.trigger 'search:item:click',
      query: @query
      item_number: model.collection.models.findIndex( (result) -> return result.id == model.id ) + 1
      item_type: model.get('display_model')
      item_id: model.get('_id')
      destination_path: "#{sd.APP_URL}#{model.href()}"
    @selected = true
    location.assign model.href()

  remove: ->
    mediator.off null, null, this
    @$input.typeahead 'destroy'
    super

  setupPlaceholder: ->
    @handlePlaceholderTextResponsively()
    $(window).on 'resize', _.throttle(@handlePlaceholderTextResponsively, 200)

  handlePlaceholderTextResponsively: =>
    if @centeredHomepageSearch
      @$input.attr('placeholder', 'Search artists, styles, subject matter, galleries')
    else if @$input.width() < 200
      @$input.attr('placeholder', 'Search by artist, etc.')
    else if @$input.width() < 400
      @$input.attr('placeholder', 'Search by artist, gallery, etc.')
    else if @$input.width() < 600
      @$input.attr('placeholder', 'Search by artist, gallery, style, tag, etc.')
    else
      @$input.attr('placeholder', 'Search by artist, gallery, style, theme, tag, etc.')
