Backbone = require 'backbone'

template = -> require('./index.jade') arguments...

module.exports = class KeywordFilterView extends Backbone.View
  className: 'cf-keyword'
  events:
    "change input#keyword-search-bar-input" : 'setKeyword'

  initialize: ({ @params, aggregations }) ->
    throw new Error "Requires a params model" unless @params
    @listenToOnce @params, 'change', @render

  setKeyword: (e) ->
    if $('input[name=keyword]').val().length > 0
      console.log('setting keyword to ' + $('input[name=keyword]').val())
      @params.set keyword: $('input[name=keyword]').val()
    else
      console.log('unsetting keyword')
      @params.unset 'keyword'

  render: ->
    #return if @params.get('include_artworks_by_followed_artists')
    @$el.html template

