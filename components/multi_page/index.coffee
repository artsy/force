_ = require 'underscore'
MultiPageView = require './view.coffee'
config = require './config.coffee'

module.exports = (key, defaultPage) ->
  options = _.extend config[key], defaultPage: defaultPage
  new MultiPageView options
