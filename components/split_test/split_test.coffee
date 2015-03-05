_ = require 'underscore'
Backbone = require 'backbone'
{ CURRENT_USER, NODE_ENV } = require('sharify').data
{ getProperty, setProperty, unsetProperty, setDimension } = require '../../lib/analytics.coffee'
IS_TEST_ENV = not _.contains(['production', 'staging', 'development'], NODE_ENV)

module.exports = class SplitTest
  constructor: ({ @key, @outcomes, @edge, @dimension }) ->
    return throw new Error('Your probability values for outcomes must add up to 1.0') if @sum() isnt 1

  _key: ->
    "split_test--#{@key}"

  cookies: ->
    if IS_TEST_ENV
      set: (->), get: (->), expire: (->)
    else
      @__cookies__ ?= require 'cookies-js'

  set: (outcome) ->
    @cookies().set @_key(), outcome
    unsetProperty @_key() # Force unset
    setProperty _.tap({}, (hsh) => hsh[@_key()] = outcome)
    setDimension @dimension, outcome if @dimension?
    outcome

  get: ->
    getProperty(@_key()) or @cookies().get(@_key())

  unset: ->
    @cookies().expire @_key()
    unsetProperty @_key()
    location.reload()

  cssClass: ->
    "is-splittest-#{@key}--#{@outcome()}"

  admin: ->
    CURRENT_USER?.type is 'Admin'

  toss: ->
    _.sample _.flatten _.map @outcomes, (probability, outcome) ->
      _.times(Math.round(probability * 10), -> outcome)

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
