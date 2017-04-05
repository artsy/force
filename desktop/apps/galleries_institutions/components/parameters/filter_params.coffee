Backbone = require 'backbone'
qs = require 'querystring'
_ = require 'underscore'
facetDefaults = require '../filter_facet/facet_defaults'

module.exports = class PartnersFilterParams extends Backbone.Model

  currentSelection: ->
    @pick _.pluck(facetDefaults(), 'facetName') || {}

  hasSelection: ->
    not _.isEmpty @currentSelection()

  urlQueryString: ->
    qs.stringify @currentSelection()
