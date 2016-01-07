Backbone = require 'backbone'
{ Cities } = require 'places'
qs = require 'querystring'
_ = require 'underscore'

defaults =
  cache: true
  has_full_profile: true

module.exports = class PartnersFilterParams extends Backbone.Model

  # Format params for the API request

  hasFilterParams: ->
    @get 'location' or @get 'category'

  urlQueryString: ->
    qs.stringify @pick 'location', 'category'