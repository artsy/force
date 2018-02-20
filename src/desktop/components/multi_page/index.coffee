_ = require 'underscore'
MultiPageView = require './view.coffee'
config = require './config.coffee'

module.exports = (key, defaultPageId) ->
  options = _.extend config[key], defaultPageId: defaultPageId
  new MultiPageView options
