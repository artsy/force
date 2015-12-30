Backbone = require 'backbone'
{ Cities } = require 'places'
qs = require 'querystring'
_ = require 'underscore'

defaults =
  cache: true
  has_full_profile: true

module.exports = class PartnersFilterParams extends Backbone.Model

  # Format params for the API request

  currentSelection: ->
    @pick 'category', 'location'

  hasSelection: ->
    not _.isEmpty @currentSelection()

  urlQueryString: ->
    qs.stringify @currentSelection()