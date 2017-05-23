_ = require 'underscore'
{ CURRENT_USER } = require('sharify').data
IS_TEST_ENV = require('sharify').data.NODE_ENV not in ['production', 'staging', 'development']

# These need to be set up individually before using. Read this non-sense:
# https://developers.google.com/analytics/devguides/platform/customdimsmets
setDimension = (index, value) ->
  ga? 'set', index, value

module.exports = class SplitTest
  constructor: ({ @key, @outcomes, @edge, @dimension }) ->
    return throw new Error('Your probability values for outcomes must add up to 100') if @sum() isnt 100

  _key: ->
    "split_test--#{@key}"

  cookies: ->
    if IS_TEST_ENV
      set: (->), get: (->), expire: (->)
    else
      @__cookies__ ?= require 'cookies-js'

  set: (outcome) ->
    @cookies().set @_key(), outcome

    # Set for Google Analytics
    setDimension @dimension, outcome if @dimension?

    outcome

  get: ->
    @cookies().get(@_key())

  unset: ->
    @cookies().expire @_key()
    location.reload()

  cssClass: ->
    "is-splittest-#{@key}--#{@outcome()}"

  admin: ->
    CURRENT_USER?.type is 'Admin'

  toss: ->
    _.sample _.flatten _.map @outcomes, (probability, outcome) ->
      _.times(probability, -> outcome)

  sum: ->
    _.reduce @outcomes, (memo, probability, outcome) ->
      memo + probability
    , 0

  outcome: ->
    outcome = if (@admin() and @edge?) then @edge else @get()
    if outcome?
      @set outcome
    else
      @set @toss()

  view: ->
    analytics?.track? 'Experiment Viewed', {
      experiment_id: @key
      experiment_name: @key
      variation_id: outcome = @get()
      variation_name: outcome
      nonInteraction: 1
    }, Mixpanel: false
