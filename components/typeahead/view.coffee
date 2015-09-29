_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
form = require '../form/utilities.coffee'
Engine = require './bloodhound.coffee'
Match = require '../../collections/match.coffee'
templates =
  index: -> require('./templates/index.jade') arguments...
  empty: -> require('./templates/empty.jade') arguments...
  suggestion: (suggestion) -> require('./templates/suggestion.jade') suggestion: suggestion

module.exports = class AutocompleteView extends Backbone.View
  className: 'typeahead'

  defaults:
    # UI settings
    autofocus: false
    highlight: false
    hint: true

    # String passed to the field placeholder
    placeholder: 'Search'

    # Attribute used to pull the display value
    # out of the result objects
    nameAttr: 'name'

    # Engine settings
    param: 'term'
    wildcard: ':query'
    url: null
    path: null

    # Convenience for default collection
    kind: null

    # List of IDs that get excluded from the suggestions
    # result set
    selected: []

  initialize: (options = {}) ->
    @options = _.defaults options, @defaults

    # Set all valid options as instance variables
    _.map @defaults, (v, k) => this[k] = @options[k]

    @collection ?= new Match
    @collection.kind = @kind
    @collection.url = @url if @url?

    @listenTo this, 'asyncrequest', @loading
    @listenTo this, 'asyncreceive', @doneLoading

  loading: ->
    @$el.attr 'data-state', 'loading'

  doneLoading: ->
    @$el.attr 'data-state', 'done'
    # Highlight the top result as selected
    @$('.tt-suggestion:first').addClass 'tt-cursor'

  parse: (response) ->
    if @path?
      response = _.reduce @path.split('.'), (memo, key) ->
        return memo[key]
      , response

    @collection.reset _.map response, (suggestion) =>
      suggestion.name = suggestion[@nameAttr]
      suggestion

  setupUrl: ->
    [url, search] = _.result(@collection, 'url').split '?'
    (params = qs.parse search)[@param] = @wildcard
    [url, qs.stringify(params)].join '?'

  engineSettings: ->
    url: @setupUrl()
    filter: @parse.bind this
    wildcard: encodeURIComponent @wildcard
    ajax:
      beforeSend: => @trigger 'asyncrequest'
      complete: => @trigger 'asyncreceive'

  typeaheadOptions: ->
    highlight: @highlight
    hint: @hint

  dataset: ->
    name: _.uniqueId 'typeahead'
    templates: templates
    source: (query, cb) =>
      @engine.get query, (suggestions) =>
        cb @withoutSelected(suggestions)
    display: (suggestion) ->
      suggestion.get 'name'

  withoutSelected: (suggestions) ->
    _.reject suggestions, (suggestion) =>
      _.contains @selected, suggestion.id

  input: ->
    @$input ?= @$('.js-typeahead-input')

  open: ->
    @input().typeahead 'open'

  close: ->
    @input().typeahead 'close'

  set: (value) ->
    @input().typeahead 'val', value

  value: ->
    @input().typeahead 'val'

  clear: ->
    @set ''
    @close()

  exclude: (ids...) ->
    @selected = _.unique @selected.concat(ids)

  postRender: ->
    @engine ?= new Engine @engineSettings()
    @engine.initialize()

    @input()
      .typeahead @typeaheadOptions(), @dataset()
      .on 'typeahead:selected', (e, suggestion) =>
        @trigger 'selected', suggestion
        @exclude suggestion.id
        @clear()

    if @autofocus
      form.autofocus @input(), true

  render: ->
    @$el.html templates.index
      placeholder: @placeholder
    @postRender()
    this

  remove: ->
    @input().typeahead 'destroy'
    super
