_             = require 'underscore'
Backbone      = require 'backbone'
sd            = require('sharify').data
Search        = require './collections/search.coffee'
itemTemplate  = -> require('./templates/item.jade') arguments...
mediator      = require '../../../../lib/mediator.coffee'

module.exports = class SearchBarView extends Backbone.View
  initialize: (options) ->
    @search = new Search

    @$input   = options.$input

    mediator.on 'search:start', @indicateLoading, this
    mediator.on 'search:complete', @concealLoading, this
    mediator.on 'search:selected', @selectResult, this
    mediator.on 'search:opened', @displaySuggestions, this
    mediator.on 'search:closed', @hideSuggestions, this

    @setupTypeahead()

  events:
    'keyup input': 'checkSubmission'

  checkSubmission: (e) ->
    return if !(e.which is 13) or @selected
    window.location = "/search?q=#{@$input.val()}"

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
        itemTemplate item: item.toJSON()

  setupTypeahead: ->
    _.each ['opened', 'closed', 'selected'], (action) =>
      @$input.on "typeahead:#{action}", (args...) ->
        mediator.trigger "search:#{action}", args...

    @$input.typeahead
      template: 'custom'
      name: 'search'
      limit: 10
      engine: @_engine
      remote:
        url: "#{@search.url}&term=%QUERY"
        filter: @search._parse
        beforeSend: (xhr) ->
          xhr.setRequestHeader 'X-XAPP-TOKEN', sd.ARTSY_XAPP_TOKEN
          mediator.trigger 'search:start', xhr
        complete: (xhr) =>
          mediator.trigger 'search:complete', xhr
          mediator.trigger 'search:doge' if @$input.val() is 'doge'
          @$('img').error -> $(this).hide()

  selectResult: (e, model) ->
    @selected = true
    window.location = model.get 'location'

  remove: ->
    mediator.off null, null, this
    @$input.typeahead 'destroy'
    super
