Backbone = require 'backbone'
_ = require 'underscore'
qs = require 'querystring'
aggregationsMap = require '../aggregations_map.coffee'

module.exports = class Params extends Backbone.Model

  defaultParams:
    sort: '-partner_updated_at'

  initialize: ->
    @filterParamKeys = _.pluck(aggregationsMap, 'param')
    @whitelisted = @filterParamKeys.concat ['for_sale', 'sort']

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

  currentParamsQueryString: ->
    # Exclude default values of attributes that are not explicitly set
    qs.stringify _.pick @attributes, @whitelisted
