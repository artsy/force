Backbone = require 'backbone'
s = require 'underscore.string'

template = -> require('./index.jade') arguments...

module.exports = class TotalView extends Backbone.View

  initialize: ({ @filter, @artworks }) ->
    throw new Error 'Requires a filter model' unless @filter?

    @listenTo @filter, 'change:total', @render

  render: (hasResults = true) ->
    @$el.html template
      total: s(@filter.get('total')).numberFormat().value()
      hasResults: parseInt(@filter.get('total')) > 0
