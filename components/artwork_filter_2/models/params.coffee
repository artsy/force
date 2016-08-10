Backbone = require 'backbone'
_ = require 'underscore'
aggregationsMap = require '../aggregations_map.coffee'

module.exports = class Params extends Backbone.Model

  defaults:
    sort: '-partner_updated_at'
    size: 9
    page: 1

  whitelisted: ['partner', 'gallery', 'medium', 'period', 'sort', 'for_sale']

  mappedParams:
    gallery: 'partner_id'
    institution: 'partner_id'

  initialize: ->
    @aggregationParamKeys = _.pluck(aggregationsMap, 'param')

  mapped: ->
    params = _.clone @attributes
    _.each @mappedParams, (mappedParam, param) ->
      if (value = params[param])?
        params[mappedParam] = value
        delete params[param]
    params

  updateWith: (key, value) ->
    if @aggregationParamKeys.includes key
      _.each @aggregationParamKeys, (key) =>
        @unset key, silent: true

    @set key, value

  aggregationParams: ->
    @pick @aggregationParamKeys

  currentParams: ->
    @pick @aggregationParamKeys.append ['for_sale', 'sort']

  # Of the mutually exclusive filter params with aggregations
  currentFilterParam: ->
    _.findKey @aggregationParams(), (value, key, object) -> value?

