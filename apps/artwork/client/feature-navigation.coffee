Backbone = require 'backbone'

template = -> require('../templates/feature-navigation.jade') arguments...

module.exports = class FeatureNavigationView extends Backbone.View
  template: template

  initialize: (options) ->
    { @model, @kind } = options
    @render()

  # Handles Feature and Fair models
  render: ->
    @$el.html template(model: @model, kind: @kind)
    this
