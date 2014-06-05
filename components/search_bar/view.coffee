_           = require 'underscore'
Backbone    = require 'backbone'
sd          = require('sharify').data
Search      = require './collections/search.coffee'
mediator    = require '../../lib/mediator.coffee'
analytics   = require '../../lib/analytics.coffee'
{ fill }    = require '../../lib/resizer.coffee'

itemTemplate = -> require('./templates/item.jade') arguments...

module.exports = class SearchBarView extends Backbone.View
  initialize: (options) ->
    return unless @$el.length

    # Search takes a fair_id param specific to fairs. Doesn't work for other models
    { @mode, @restrictType, @$input, @fairId, @includePrivateResults } = options

    @search = new Search
      restrictType : @restrictType
      mode         : @mode
      fairId       : @fairId

    @on 'search:start',    @indicateLoading
    @on 'search:complete', @concealLoading
    @on 'search:opened',   @displaySuggestions
    @on 'search:closed',   @hideSuggestions

    @setupTypeahead()

  events:
    'keyup input' : 'checkSubmission'
    'focus input' : 'trackFocusInput'

  trackFocusInput: ->
    analytics.track.click "Focused on search input"

  checkSubmission: (e) ->
    return if !(e.which is 13) or @selected?
    @trigger 'search:entered', @$input.val()

  indicateLoading: ->
    @$el.addClass 'is-loading'

  concealLoading: ->
    @$el.removeClass 'is-loading'

  shouldDisplaySuggestions: ->
    _.isEmpty(_.trim(@$input.val()))

  displaySuggestions: ->
    @$el.addClass 'is-open' if @shouldDisplaySuggestions()

  hideSuggestions: ->
    @$el.removeClass 'is-open'

  suggestionTemplate: (item) =>
    itemTemplate fill: fill, item: item

  announceQuery: (query) ->
    mediator.trigger 'search:doge'     if query is 'doge'
    mediator.trigger 'search:skrillex' if query is 'skrillex'

  trackSearchResults: (results) ->
    string = "Searched from header, with #{if results?.length then 'results' else 'no results'}"
    analytics.track.funnel string, query: @$input.val()

  setupBloodHound: ->
    @hound = new Bloodhound
      limit          : 10
      datumTokenizer : Bloodhound.tokenizers.obj.whitespace 'value'
      queryTokenizer : Bloodhound.tokenizers.whitespace
      remote:
        url    : "#{@search._url()}&term=%QUERY"
        filter : (results) =>
          @trackSearchResults results
          @search._parse results
        ajax   :
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

    @$input.typeahead null,
      template   : 'custom'
      templates  : suggestion: @suggestionTemplate
      displayKey : 'value'
      name       : _.uniqueId 'search'
      source     : @setupBloodHound().ttAdapter()

  clear: ->
    @$input.typeahead 'val', ''

  selectResult: (e, model) ->
    return false unless model and model.get('published')
    analytics.track.click 'Selected item from search',
      query : @query
      label : analytics.modelNameAndIdToLabel model.get('display_model'), model.id
    @selected = true
    window.location = model.get 'location'

  remove: ->
    mediator.off null, null, this
    @$input.typeahead 'destroy'
    super
