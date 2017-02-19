_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
SearchResults = require '../../collections/search_results.coffee'
template = -> require('./templates/index.jade') arguments...
emptyTemplate = -> require('./templates/empty.jade') arguments...
resultTemplate = -> require('../search_results/result.jade') arguments...

module.exports = class AutoCompleteView extends Backbone.View
  events:
    'keydown input': 'search'
    'click .js-autocomplete-input-shield': 'activate'
    'blur input': 'deactivate'
    'click .js-autocomplete-close': 'close'
    'click .search-result': 'trap'

  resultsTemplate: ({ results }) ->
    if results.length
      results.map((result) ->
        resultTemplate result: result
      ).join ''
    else
      emptyTemplate()

  initialize: ->
    @search = _.debounce @__search__, 250
    @collection = new SearchResults
    @listenTo @collection, 'sync', @renderResults
    @delegateEvents()

  trap: ->
    @trapping = true

  close: ->
    @trapping = false
    @deactivate()

  activate: ->
    @$el.addClass 'is-active'
    window.scrollTo 0, 0
    @$('input').focus()

  deactivate: ->
    _.defer =>
      return if @trapping
      @$el.removeClass 'is-active'

  __search__: ->
    term = _s.trim (@$input ?= @$('input')).val()

    if @term isnt term and not _.isEmpty(term)
      @term = term

      @$el
        .attr('data-state', 'loading')
        .find('.js-autocomplete-results')
          .html '<div class="loading-spinner"></div>'

      @collection.fetch data: term: term

  renderResults: ->
    @$el.attr 'data-state', 'done'

    (@$results ?= @$el.find('.js-autocomplete-results'))
      .html @resultsTemplate(results: @collection)

  render: ->
    @$el.html template()
    this
