runningTests = require './running_tests'
SplitTest = require './split_test'

module.exports = (key) ->
  return unless (config = runningTests[key])?

  new SplitTest config
