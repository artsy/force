runningTests = require './running_tests.coffee'
SplitTest = require './split_test.coffee'

module.exports = (key) ->
  return unless (config = runningTests[key])?

  new SplitTest config
