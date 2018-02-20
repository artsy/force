_ = require 'underscore'
initCarousel = require './index.coffee'
template = -> require('./templates/bottom_navigation.jade') arguments...

module.exports = ($el, options = {}, callback) ->
  defaults =
    wrapAround: false
    contain: true
    template: template

  options = _.defaults options, defaults
  initCarousel $el, options, callback
