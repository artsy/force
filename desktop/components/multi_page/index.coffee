_ = require 'underscore'
MultiPageView = require './view'
config = require './config'

module.exports = (key, defaultPageId) ->
  options = _.extend config[key], defaultPageId: defaultPageId
  new MultiPageView options
