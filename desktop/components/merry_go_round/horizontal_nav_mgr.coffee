_ = require 'underscore'
initCarousel = require './index'
template = -> require('./templates/horizontal_navigation.jade') arguments...

module.exports = ($el, options = {}, callback) ->
  defaults =
    wrapAround: true
    contain: true
    template: template

  options = _.defaults options, defaults
  $el.addClass 'mgr-horizontal-nav'
  initCarousel $el, options, callback
