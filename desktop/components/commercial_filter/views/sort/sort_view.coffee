_ = require 'underscore'
Backbone = require 'backbone'
BorderedPulldown = require '../../../bordered_pulldown/view'
defaultSortMap = require './sort_map'
template = -> require('./index.jade') arguments...

module.exports = class SortView extends Backbone.View
  events:
    'click .bordered-pulldown-options a': 'setSort'

  sortMap: ->
    @customSortMap || defaultSortMap

  defaultSort: ->
    _.keys(@sortMap())[0]

  initialize: ({ @params, @customSortMap }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenToOnce @params, 'change', @render

  setSort: (e) ->
    e.preventDefault()
    @params.set sort: $(e.target).data('sort')

  render: ->
    @$el.html template
      currentSort: @params.get('sort') or @defaultSort()
      map: @sortMap()

    _.defer => @_postRender()

  _postRender: ->
    new BorderedPulldown el: @$('.bordered-pulldown')
