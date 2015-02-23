_ = require 'underscore'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
sd = require('sharify').data
{ getProperty, setProperty, unsetProperty } = require '../../lib/analytics.coffee'

module.exports = class SplitTest
  constructor: ({ @key, @outcomes, @edge }) ->
    return throw new Error('Your probability values for outcomes must add up to 1.0') if @sum() isnt 1

  _key: ->
    "split_test--#{@key}"

  set: (outcome) ->
    Cookies.set @_key(), outcome
    unsetProperty @_key() # Force unset
    setProperty _.tap({}, (hsh) => hsh[@_key()] = outcome)
    outcome

  get: ->
    getProperty(@_key()) or Cookies.get(@_key())

  unset: ->
    Cookies.expire @_key()
    unsetProperty @_key()
    location.reload()

  cssClass: ->
    "is-splittest-#{@key}--#{@outcome()}"

  admin: ->
    sd.CURRENT_USER?.type is 'Admin'

  toss: ->
    _.sample _.flatten _.map @outcomes, (probability, outcome) ->
      _.times(Math.round(probability * 10), -> outcome)

  sum: ->
    _.reduce @outcomes, (memo, probability, outcome) ->
      memo + probability
    , 0

  outcome: ->
    outcome = if (@admin() and @edge?) then @edge else @get()
    return outcome if outcome
    @set @toss()
