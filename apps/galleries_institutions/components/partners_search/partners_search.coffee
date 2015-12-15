Backbone = require 'backbone'
Partners = require '../../../../collections/partners.coffee'
Places = require 'places'
qs = require 'querystring'
_ = require 'underscore'

module.exports = class PartnersSearch extends Backbone.Model

  initialize: ->
    @set partners: new Partners

  fetch: (params) ->
    @get('partners').fetch
      data: @formatParams params

  # Format params for the API request
  formatParams: (params) ->
    queryParams = {}
    queryParams.partner_categories = [params.get 'category'] if params.get 'category'
    city = _.findWhere Places.Cities, slug: params.get 'location' if params.get 'location'
    queryParams.near = city.coords.join (',') if city
    queryParams