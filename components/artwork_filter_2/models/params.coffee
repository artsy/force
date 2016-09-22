Backbone = require 'backbone'
_ = require 'underscore'
qs = require 'querystring'
aggregationsMap = require '../aggregations_map.coffee'

module.exports = class Params extends Backbone.Model

  defaults:
    sort: '-partner_updated_at'

  mappedParams:
    gallery: 'partner_id'
    institution: 'partner_id'

  initialize: ->
    @aggregationParamKeys = _.pluck(aggregationsMap, 'param')
    @whitelisted = @aggregationParamKeys.concat ['sort', 'for_sale']

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

  currentParamsQueryString: ->
    # Exclude attributes that are not explicitly set
    qs.stringify _.pick @attributes, @whitelisted

  # Of the mutually exclusive filter params with aggregations
  currentFilterParam: ->
    _.findKey @aggregationParams(), (value, key, object) -> value?

