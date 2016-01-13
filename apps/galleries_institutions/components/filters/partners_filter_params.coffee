Backbone = require 'backbone'
{ Cities } = require 'places'
qs = require 'querystring'
_ = require 'underscore'
facetDefaults = require './facet_defaults.coffee'

defaults =
  cache: true
  has_full_profile: true

module.exports = class PartnersFilterParams extends Backbone.Model

  # Format params for the API request

  currentSelection: ->
    @pick _.pluck(facetDefaults, 'facetName')

  hasSelection: ->
    not _.isEmpty @currentSelection()

  urlQueryString: ->
    qs.stringify @currentSelection()