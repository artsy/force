MultiPageView = require './view.coffee'
config = require './config.coffee'

module.exports = (key) ->
  new MultiPageView config[key]
