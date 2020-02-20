SplitTest = require './server_split_test.coffee'
runningTests = require './running_tests'
qs = require 'qs'

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
  # We hook into `process.env` and `res.locals` (sharify)
  # to enable a seamless isomorphic experience with Reaction.
  res.locals.sd['EXPERIMENTAL_APP_SHELL'] = Boolean(res.locals.sd['CLIENT_NAVIGATION_V3'] is 'experiment')
  # All values set in `process.env` get stringified.
  # So, we just want to set either _some_ truthy value here (for enabled)
  # or not set anything at all (for disabled).
  process.env['EXPERIMENTAL_APP_SHELL'] = true if res.locals.sd['EXPERIMENTAL_APP_SHELL']

  next()
