_ = require 'underscore'
Backbone = require 'backbone'
BorderedPulldown = require '../../../bordered_pulldown/view.coffee'
sortMap = require './sort_map.coffee'
template = -> require('./index.jade') arguments...

module.exports = class SortView extends Backbone.View
  events:
    'click .bordered-pulldown-options a': 'setSort'

  defaultSort: '-partner_updated_at'

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenToOnce @params, 'change', @render

  setSort: (e) ->
    e.preventDefault()
    @params.set sort: $(e.target).data('sort')

  render: ->
    @$el.html template
      currentSort: @params.get('sort') or @defaultSort
      map: sortMap

    _.defer => @_postRender()

  _postRender: ->
    new BorderedPulldown el: @$('.bordered-pulldown')
