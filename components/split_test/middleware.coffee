SplitTest = require './server_split_test.coffee'
runningTests = require './running_tests'

module.exports = (req, res, next) ->
  for key, configuration of runningTests
    unless res.locals.sd[key.toUpperCase()]?
      test = new SplitTest req, res, configuration
      res.locals.sd[key.toUpperCase()] = test.outcome()

  next()
