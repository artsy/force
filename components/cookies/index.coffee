_ = require 'underscore'
{ NODE_ENV } = require('sharify').data
IS_TEST_ENV = not _.contains(['production', 'staging', 'development'], NODE_ENV)
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