Backbone = require 'backbone'
analyticsHooks = require '../../../../lib/analytics_hooks.coffee'
template = -> require('./index.jade') arguments...

module.exports = class KeywordFilterView extends Backbone.View
  className: 'cf-keyword'
  events:
    "change input#keyword-search-bar-input" : 'setKeyword'

  initialize: ({ @params }) ->
    throw new Error "Requires a params model" unless @params
    @listenTo @params, 'change', @render

  setKeyword: (e) ->
    if (keyword = $('input[name=keyword]').val()).length > 0
      @params.unset 'sort', silent: true
      @params.set keyword: keyword
      analyticsHooks.trigger 'search:collect', query: keyword
    else
      @params.unset 'keyword'

  render: ->
    @$el.html template
