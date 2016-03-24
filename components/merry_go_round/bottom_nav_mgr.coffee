_ = require 'underscore'
initCarousel = require './index.coffee'
template = -> require('./templates/bottom_navigation.jade') arguments...

module.exports = ($el, options = {}, callback) ->
  options = _.extend {}, options, template: template
  initCarousel $el, options, callback
