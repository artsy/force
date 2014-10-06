runningTests = require './running_tests.coffee'
SplitTest = require './split_test.coffee'

module.exports = (key) ->
  new SplitTest runningTests[key]
