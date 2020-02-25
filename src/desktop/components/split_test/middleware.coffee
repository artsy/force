SplitTest = require './server_split_test.coffee'
runningTests = require './running_tests'
qs = require 'qs'
{ setSplitTest } = require './splitTestContext'

module.exports = (req, res, next) ->
  for key, configuration of runningTests
    unless res.locals.sd[key?.toUpperCase()]?
      test = new SplitTest req, res, configuration
      res.locals.sd[key.toUpperCase()] = test.outcome()

  if req.query?.split_test
    params = qs.parse req.query?.split_test
    for k, v of params
      test = new SplitTest req, res, runningTests[k]
      test.set v
      res.locals.sd[k.toUpperCase()] = v

  # TODO: Remove when the client nav AB test ends.
  if runningTests['client_navigation_v3']
    res.locals.sd['EXPERIMENTAL_APP_SHELL'] = Boolean(res.locals.sd['CLIENT_NAVIGATION_V3'] is 'experiment')

  # Store value in globally available location.
  setSplitTest('EXPERIMENTAL_APP_SHELL', res.locals.sd['EXPERIMENTAL_APP_SHELL'])

  next()
