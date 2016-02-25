_ = require 'underscore'
Backbone = require 'backbone'
BorderedPulldown = require '../../../bordered_pulldown/view.coffee'

template = -> require('./index.jade') arguments...

module.exports = class SortView extends Backbone.View
  events:
    'click .bordered-pulldown-options a': 'setSort'

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenToOnce @params, 'change', @render

  setSort: (e) ->
    e.preventDefault()
    @params.set sort: $(e.target).data('sort')

  render: ->
    @$el.html template
      sort: @params.get 'sort'

    _.defer => @_postRender()

  _postRender: ->
    new BorderedPulldown el: @$('.bordered-pulldown')
