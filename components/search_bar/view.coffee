_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
sd = require('sharify').data
Search = require './collections/search.coffee'
mediator = require '../../lib/mediator.coffee'
analytics = require '../../lib/analytics.coffee'
{ fill } = require '../../lib/resizer.coffee'
itemTemplate = -> require('./templates/item.jade') arguments...

module.exports = class SearchBarView extends Backbone.View
  initialize: (options) ->
    return unless @$el.length

    # Search takes a fair_id param specific to fairs. Doesn't work for other models
    { @mode, @restrictType, @$input, @fairId, @includePrivateResults, @limit, @autoselect, @displayKind } =
      _.defaults options, limit: 10, autoselect: false, displayKind: true

    @$input ?= @$('input')
    throw new Error('Requires an input field') unless @$input?

    @search = new Search
      restrictType: @restrictType
      mode: @mode
      fairId: @fairId

    @on 'search:start', @indicateLoading
    @on 'search:complete', @concealLoading
    @on 'search:complete', @maybeHighlight
    @on 'search:complete', @displayFeedback
    @on 'search:opened', @displaySuggestions
    @on 'search:closed', @hideSuggestions

    @setupTypeahead()

  events:
    'keyup input': 'checkSubmission'
    'focus input': 'trackFocusInput'

  trackFocusInput: ->
    analytics.track.click "Focused on search input"

  checkSubmission: (e) ->
    @hideSuggestions()
    return if !(e.which is 13) or @selected?
    @trigger 'search:entered', @$input.val()

  indicateLoading: ->
    @renderFeedback()
    @$el.addClass 'is-loading'

  concealLoading: ->
    @$el.removeClass 'is-loading'

  # Adds a highlight class if autoselect is true
  # (rather than actually moving the cursor down
  # which would overwrite the user's typing)
  maybeHighlight: ->
    @$('.tt-suggestion:first').addClass('tt-cursor') if @autoselect

  feedbackString: ->
    @__feedbackString__ ?= if @mode?
      "Search for #{_s.titleize(@mode)}…"
    else
      'Search Artists, Artworks, Galleries, Museums, Categories…'

  displayFeedback: ->
    if @search.results.length
      @hideSuggestions()
    else
      @renderFeedback 'No results found'
      @$el.addClass 'is-no-results'

  renderFeedback: (feedback) ->
    (@$feedback ?= @$('.autocomplete-feedback'))
      .text feedback or @feedbackString()

  shouldDisplaySuggestions: ->
    _.isEmpty(_.trim(@$input.val()))

  displaySuggestions: ->
    if @shouldDisplaySuggestions()
      @renderFeedback()
      @$el.addClass 'is-display-suggestions'

  hideSuggestions: ->
    @$el.removeClass 'is-display-suggestions is-no-results'

  suggestionTemplate: (item) =>
    itemTemplate fill: fill, item: item, displayKind: @displayKind

  announceQuery: (query) ->
    mediator.trigger 'search:doge' if query is 'doge'
    mediator.trigger 'search:skrillex' if query is 'skrillex'

  trackSearchResults: (results) ->
    string = "Searched from header, with #{if results?.length then 'results' else 'no results'}"
    analytics.track.funnel string, query: @$input.val()

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
            @query = @$input.val()
            @trigger 'search:complete', xhr
            @announceQuery @query
    @hound.initialize()
    @hound

  setupTypeahead: ->
    _.each ['opened', 'closed', 'selected'], (action) =>
      @$input.on "typeahead:#{action}", (args...) =>
        @trigger "search:#{action}", args...

    @$input.typeahead { autoselect: @autoselect },
      template: 'custom'
      templates: suggestion: @suggestionTemplate
      displayKey: 'value'
      name: _.uniqueId 'search'
      source: @setupBloodHound().ttAdapter()

  clear: ->
    @$input.typeahead 'val', ''

  selectResult: (e, model) ->
    return false unless model and model.get('published')
    analytics.track.click 'Selected item from search',
      query: @query
      label: analytics.modelNameAndIdToLabel model.get('display_model'), model.id
    @selected = true
    window.location = model.get 'location'

  remove: ->
    mediator.off null, null, this
    @$input.typeahead 'destroy'
    super
