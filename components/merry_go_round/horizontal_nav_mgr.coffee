_ = require 'underscore'
initCarousel = require './index.coffee'
template = -> require('./templates/horizontal_navigation.jade') arguments...


module.exports = ($el, options = {}, callback) ->
  defaults =
    wrapAround: false
    contain: false
    template: template

  $el.addClass 'mgr-horizontal-nav'
  options = _.defaults options, defaults
  initCarousel $el, options, callback