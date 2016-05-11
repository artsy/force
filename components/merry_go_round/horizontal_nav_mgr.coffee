_ = require 'underscore'
initCarousel = require './index.coffee'
template = -> require('./templates/horizontal_navigation.jade') arguments...

module.exports = ($el, options = {}, callback) ->
  console.log $el
  console.log $el.parent()
  defaults =
    wrapAround: true
    contain: true
    template: template

  options = _.defaults options, defaults
  initCarousel $el, options, callback
  $el.addClass 'mgr-horizontal-nav'