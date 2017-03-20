Backbone = require 'backbone'

template = -> require('./index.jade') arguments...

module.exports = class KeywordFilterView extends Backbone.View
  className: 'cf-keyword'
  events:
    "change input#keyword-search-bar-input" : 'setKeyword'

  initialize: ({ @params, aggregations }) ->
    throw new Error "Requires a params model" unless @params
    @listenToOnce @params, 'change', @render
    @listenTo @aggregations, 'reset', @render

  setKeyword: (e) ->
    if $('input[name=keyword]').val().length > 0
      @params.set keyword: $('input[name=keyword]').val()
    else
      @params.unset 'keyword'

  render: ->
    @$el.html template
      keyword: @params.get('keyword')
