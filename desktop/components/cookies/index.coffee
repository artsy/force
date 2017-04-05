_ = require 'underscore'
IS_TEST_ENV = require '../../lib/is_test_env'
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
