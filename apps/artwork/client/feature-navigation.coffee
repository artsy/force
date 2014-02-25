Backbone = require 'backbone'

template = -> require('../templates/feature-navigation.jade') arguments...

module.exports = class FeatureNavigationView extends Backbone.View
  template: template

  initialize: (options) ->
    { @model, @kind } = options
    @render()

  # Handles Feature and Fair models
  render: ->
    href =
      if @kind == 'feature'
        "/feature/#{@model.id}"
      else if @kind == 'fair'
        console.log @model
        "/#{@model.get('organizer').profile_id}"
      else
        "/#{@model.id}"

    @$el.html template
      model: @model
      kind: @kind
      href: href
    @
