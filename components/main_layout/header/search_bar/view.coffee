_             = require 'underscore'
Backbone      = require 'backbone'
sd            = require('sharify').data
Search        = require './collections/search.coffee'
itemTemplate  = -> require('./templates/item.jade') arguments...
mediator      = require '../../../../lib/mediator.coffee'
analytics     = require '../../../../lib/analytics.coffee'

module.exports = class SearchBarView extends Backbone.View
  initialize: (options) ->
    return unless @$el.length

    { @mode, @restrictType, @$input } = options

    @search = new Search mode: @mode, restrictType: @restrictType

    @on 'search:start', @indicateLoading
    @on 'search:complete', @concealLoading
    @on 'search:opened', @displaySuggestions
    @on 'search:closed', @hideSuggestions

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

  _engine:
    compile: ->
      render: (item) ->
        itemTemplate item: item

  setupTypeahead: ->
    _.each ['opened', 'closed', 'selected'], (action) =>
      @$input.on "typeahead:#{action}", (args...) =>
        @trigger "search:#{action}", args...

    @$input.typeahead
      template: 'custom'
      name: _.uniqueId('search')
      limit: 10
      engine: @_engine
      remote:
        url: "#{@search._url()}&term=%QUERY"
        filter: (items) =>
          if items?.length
            analytics.track.funnel "Searched from header, with results", { query: @$input.val() }
          else
            analytics.track.funnel "Searched from header, with no results", { query: @$input.val() }
          @search._parse(items)
        beforeSend: (xhr) =>
          xhr.setRequestHeader 'X-XAPP-TOKEN', sd.ARTSY_XAPP_TOKEN
          @trigger 'search:start', xhr
        complete: (xhr) =>
          @trigger 'search:complete', xhr
          mediator.trigger 'search:doge' if @$input.val() is 'doge'
          @query = @$input.val()

  selectResult: (e, model) ->
    analytics.track.click "Selected item from search", { label: analytics.modelNameAndIdToLabel(model.get('display_model'), model.get('id')), query: @query }
    @selected = true
    window.location = model.get 'location'

  remove: ->
    mediator.off null, null, this
    @$input.typeahead 'destroy'
    super
