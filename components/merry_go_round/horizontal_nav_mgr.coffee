_ = require 'underscore'
initCarousel = require './index.coffee'
template = -> require('./templates/horizontal_navigation.jade') arguments...

module.exports = ($el, options = {}, callback) ->
  $el.addClass 'mgr-horizontal-nav'
  options = _.extend {}, options, template: template
  initCarousel $el, options, callback