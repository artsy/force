SplitTest = require './server_split_test.coffee'
runningTests = require './running_tests'
qs = require 'qs'
sd = require('sharify').data

module.exports = (req, res, next) ->
  for key, configuration of runningTests
    unless res.locals.sd[key?.toUpperCase()]?
      test = new SplitTest req, res, configuration
      outcome = test.outcome()
      res.locals.sd[key.toUpperCase()] = outcome
      sd[key.toUpperCase()] = outcome

  if req.query?.split_test
    params = qs.parse req.query?.split_test
    for k, v of params
      test = new SplitTest req, res, runningTests[k]
      test.set v
      res.locals.sd[k.toUpperCase()] = v
      sd[k.toUpperCase()] = v

  next()
