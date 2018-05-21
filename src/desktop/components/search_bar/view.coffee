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
CurrentUser = require '../../models/current_user.coffee'
SearchResult = require '../../models/search_result.coffee'

module.exports = class SearchBarView extends Backbone.View
  defaults:
    limit: 4
    autoselect: false
    displayKind: true
    displayEmptyItem: false
    shouldDisplaySuggestions: true

  Keys: {
    Enter: 13
    Left: 37
    Right: 39
  }

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

    @enableSpotlightAutocomplete = CurrentUser.orNull()?.hasLabFeature('Spotlight Search')
    @autoselect = false if @enableSpotlightAutocomplete
    @setupTypeahead()
    @setupPlaceholder()

    @$spotlight = @$('#spotlight-search')
    @$spotlightInitialText = @$spotlight.find('#spotlight-search__initial-text')
    @$spotlightRemainingText = @$spotlight.find('#spotlight-search__remaining-text')

  events:
    'blur input': 'hideSpotlight'
    'keydown input': 'maybeHideSpotlight'
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
    return if !(e.which is @Keys.Enter) or @selected?

    unless @isEmpty()
      @trigger 'search:entered', encodeURIComponent(@$input.val())

  maybeHideSpotlight: (e) ->
    return unless @enableSpotlightAutocomplete
    return if e.which is @Keys.Left or e.which is @Keys.Right

    if e.which is @Keys.Enter
      if @spotlightSearchResult
        location.assign @spotlightSearchResult.href()
        @$input.val(@spotlightSearchResult.get('display'))
        @hideSpotlight()
        return
      else
        @emptyItemClick() if @isEmpty()

    letterPressed = String.fromCharCode(e.which).toLowerCase()
    if letterPressed is @$spotlightRemainingText.text().charAt(0).toLowerCase()
      return @shiftLetter(letterPressed)

    @hideSpotlight()

  shiftLetter: (letter) ->
    shiftedInitialText = "#{@$spotlightInitialText.text()}#{letter}"
    @$spotlightInitialText.text(shiftedInitialText)
    @$spotlightRemainingText.text(@$spotlightRemainingText.text().slice(1))

  hideSpotlight: ->
    @$spotlight.css('z-index', '-1')
    @spotlightSearchResult = null

  showSpotlight: ->
    @$spotlight.css('z-index', '2')

  # Display spotlight result if:
  # - more than 4 characters have been typed AND
  # - query is more than 30% of the length of the search result AND
  # - query is a case-insensitive leading match of the search result or any token
  shouldShowSpotlightSearch: (searchResult) ->
    @isSubsequentMatch = false
    currentQuery = @$input.val()
    currentQuery.length > 4 &&
      (currentQuery.length / searchResult.length) >= 0.3 &&
      @isLeadingMatchOfAnyToken(currentQuery, searchResult)

  # Return true if:
  #  - result starts with word OR
  #  - any token in result starts with word (sets isSubsequentMatch to true)
  isLeadingMatchOfAnyToken: (word, result) ->
    return true if result.toLowerCase().indexOf(word.toLowerCase()) is 0

    if word.indexOf(' ') > -1
      regex = new RegExp(word, 'i')
      return @isSubsequentMatch = true if result.match(regex)

    _.each result.split(' '), (token) =>
      if token.toLowerCase().indexOf(word.toLowerCase()) is 0
        return @isSubsequentMatch = true

    return @isSubsequentMatch

  displaySpotlightSearch: (result) ->
    return unless @enableSpotlightAutocomplete

    searchResult = new SearchResult(result)
    return @hideSpotlight() unless @shouldShowSpotlightSearch(searchResult.get('display'))

    @spotlightSearchResult = searchResult
    currentQuery = @$input.val()
    if @isSubsequentMatch
      currentQuery += "  "
      remainingText = "·  " + searchResult.get('display')
    else
      remainingText = searchResult.get('display').replace(new RegExp(currentQuery, 'i'), '')
    @$spotlightInitialText.text(currentQuery)
    @$spotlightRemainingText.text(remainingText)
    @showSpotlight()

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
    @$('.tt-suggestion:first').addClass('tt-cursor') if @autoselect or (@enableSpotlightAutocomplete and @spotlightSearchResult)

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
          @displaySpotlightSearch(results[0]) if results?.length > 0
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
  
    templateOptions = {
      suggestion: @suggestionTemplate
      empty: -> "" # Typeahead won't render the header for empty results unless 'empty' is defined
    }

    _.extend(templateOptions, @placeHolderItemPlacement())
    @$input.typeahead { autoselect: @autoselect },
      template: 'custom'
      templates: templateOptions
      displayKey: 'value'
      name: _.uniqueId 'search'
      source: @setupBloodHound().ttAdapter()

  placeHolderItemPlacement: ->
    if @enableSpotlightAutocomplete
      { footer: @emptyItemTemplate }
    else
      { header: @emptyItemTemplate }

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
