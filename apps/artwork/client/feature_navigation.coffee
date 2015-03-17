Backbone = require 'backbone'
template = -> require('../templates/feature_navigation.jade') arguments...

module.exports = class FeatureNavigationView extends Backbone.View
  initialize: ({ @model, @kind }) ->
    @render()

  fairIsNotPublished: ->
    (@kind is 'fair') and (not @model.get('published'))

  href: ->
    if @model.get('is_auction')
      "/auction/#{@model.id}"
    else if @kind is 'feature'
      "/feature/#{@model.id}"
    else if @kind is 'fair'
      "/#{@model.get('default_profile_id')}"
    else
      "/#{@model.id}"

  render: ->
    unless @fairIsNotPublished() or (not @model.has 'name')
      @$el.html template
        model: @model
        kind: @kind
        href: @href()

    this
