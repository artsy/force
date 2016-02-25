Backbone = require 'backbone'
_s = require 'underscore.string'

template = -> require('./index.jade') arguments...

module.exports = class TotalView extends Backbone.View

  initialize: ({ @filter }) ->
    throw new Error 'Requires a filter model' unless @filter?

    @listenTo @filter, 'change:total', @render

  render: ->
    @$el.html template
      total: _s.numberFormat @filter.get('total')

