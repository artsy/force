_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class Filter extends Backbone.Model
  defaults:
    active: 'all'
    filter_by: 'type'
    filters: {}

  # Compare the requested filters with the available filterable values
  # and return only the filters which are relevant for the content for display
  relevant: ->
    @__relevant__ ?= # Assumes the collection doesn't get any new filterable values once this is called
      _.pick @get('filters'), _.intersection(_.keys(@get('filters')), @get('collection').pluck(@get('filter_by')))...
