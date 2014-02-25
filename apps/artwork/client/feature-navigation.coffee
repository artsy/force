Backbone = require 'backbone'
template = -> require('../templates/feature-navigation.jade') arguments...

module.exports = class FeatureNavigationView extends Backbone.View

  initialize: (options) ->
    { @model, @kind } = options
    @render()

  # Handles Feature and Fair models
  render: ->
    href =
      if @kind == 'feature'
        "/feature/#{@model.id}"
      else if @kind == 'fair'
        "/#{@model.get('organizer').profile_id}"
      else
        "/#{@model.id}"

    @$el.html template
      model: @model
      kind: @kind
      href: href
    @
