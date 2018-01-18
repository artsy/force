_ = require 'underscore'
Backbone = require 'backbone'
BorderedPulldown = require '../../../bordered_pulldown/view.coffee'
defaultSortMap = require './sort_map.coffee'
template = -> require('./index.jade') arguments...

module.exports = class SortView extends Backbone.View
  events:
    'click .bordered-pulldown-options a': 'setSort'

  sortMap: ->
    if !@params.has('keyword')
      defaultSortMap
    else
      { 'relevance': 'Relevance' }

  defaultSort: ->
    _.keys(@sortMap())[0]

  currentSort: ->
    if @params.has('sort')
      @params.get('sort')
    else
      @defaultSort()

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenTo @params, 'change', @render

  setSort: (e) ->
    e.preventDefault()
    @params.set sort: $(e.target).data('sort')

  render: ->
    @$el.html template
      currentSort: @currentSort()
      map: @sortMap()
      isDisabled: @params.has('keyword')

    _.defer => @_postRender()

  _postRender: ->
    new BorderedPulldown
      el: @$('.bordered-pulldown')
