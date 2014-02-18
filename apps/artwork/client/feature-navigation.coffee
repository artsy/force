_               = require 'underscore'
Backbone        = require 'backbone'
{ ARTSY_URL }   = require('sharify').data

template = -> require('../templates/feature-navigation.jade') arguments...

module.exports = class FeatureNavigationView extends Backbone.View
  template: template

  initialize: (options = {}) ->
    { @artwork } = options
    @setupFeatures()

  setupFeatures: ->
    @features = new Backbone.Collection
    @features.url = "#{ARTSY_URL}/api/v1/related/features?artwork[]=#{@artwork.id}"
    @features.fetch
      success: => @render()
      error: => @remove()

  render: ->
    return @remove() unless @features.length
    @$el.html template(feature: @features.first())
    this
