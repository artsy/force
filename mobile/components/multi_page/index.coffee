MultiPageView = require './view'
config = require './config'

module.exports = (key) ->
  new MultiPageView config[key]
