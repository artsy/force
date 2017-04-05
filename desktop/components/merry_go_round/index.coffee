_ = require 'underscore'
Backbone = require 'backbone'
MerryGoRoundNavView = require './view'
MerryGoRoundFlickity = require './wrapper'

setup = ($el, options = {}, callback) ->
  $viewport = $el.find options.selector or '.js-mgr-cells'
  $cells = $viewport.find options.cellSelector or '.js-mgr-cell'
  $navigation = $el.find options.navigationSelector or '.js-mgr-navigation'

  cells = new MerryGoRoundFlickity $viewport, options
  navigation = new MerryGoRoundNavView _.extend {}, options,
    el: $navigation
    flickity: cells.flickity
  {
    cells: cells
    navigation: navigation.render()
  }

module.exports = ($el, options = {}, callback) ->
  return unless $el and $el.length

  if options.imagesLoaded
    dfd = $.Deferred()
    ($el.find options.selector or '.js-mgr-cells')
      .imagesLoaded =>
        instance = setup $el, options, callback
        dfd.resolve instance
        callback? instance
    dfd.promise()
  else
    instance = setup $el, options, callback
    callback? instance
    instance
