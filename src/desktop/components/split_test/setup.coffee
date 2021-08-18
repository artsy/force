isEmpty = require 'lodash/isEmpty'
runningTests = require './running_tests.coffee'
SplitTest = require './split_test.coffee'

module.exports = ->
  return if isEmpty runningTests

  for key, configuration of runningTests
    unless configuration.scope is 'local'
      new SplitTest(configuration)?.outcome()
