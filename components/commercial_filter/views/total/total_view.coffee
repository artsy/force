Backbone = require 'backbone'
s = require 'underscore.string'

template = -> require('./index.jade') arguments...

module.exports = class TotalView extends Backbone.View

  initialize: ({ @filter }) ->
    throw new Error 'Requires a filter model' unless @filter?

    @listenTo @filter, 'change:total', @render

  render: ->
    console.log "s(@filter.get('total')).numberFormat().value()", s(@filter.get('total')).numberFormat().value()
    @$el.html template
      total: s(@filter.get('total')).numberFormat().value()

