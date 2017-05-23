_ = require 'underscore'
IS_TEST_ENV = require('sharify').data.NODE_ENV not in ['production', 'staging', 'development']
methods = ['get', 'set', 'expire']

cookies = ->
  if IS_TEST_ENV
    _.reduce methods, (memo, method) ->
      memo[method] = (->)
      memo
    , {}
  else
    require 'cookies-js'

module.exports = _.reduce methods, (memo, method) ->
  memo[method] = -> cookies()[method] arguments...
  memo
, {}
