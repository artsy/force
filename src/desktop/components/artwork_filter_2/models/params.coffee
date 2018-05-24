Backbone = require 'backbone'
_ = require 'underscore'
qs = require 'querystring'
aggregationsMap = require '../aggregations_map.coffee'

module.exports = class Params extends Backbone.Model
  defaults:
    page: 1
    size: 40
    sort: '-partner_updated_at'

  initialize: ->
    @filterParamKeys = _.pluck(aggregationsMap, 'param')
    @whitelisted = @filterParamKeys.concat ['for_sale', 'page', 'sort']

  mapped: ->
    _.reduce aggregationsMap, (memo, { param, apiParam }) =>
      value = @get param
      if apiParam and value
        delete memo[param]
        memo[apiParam] = value
      memo
    , _.clone @attributes

  updateWith: (key, value) ->
    if @filterParamKeys.includes key
      _.each @filterParamKeys, (key) =>
        @unset key, silent: true
    @set key, value

  queryStringToParams: (queryString) ->
    params = qs.parse(queryString)
    @set params

  currentParamsQueryString: ->
    # Exclude default values of attributes that are not explicitly set
    qs.stringify _.pick @attributes, @whitelisted
