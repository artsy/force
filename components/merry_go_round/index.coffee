_ = require 'underscore'
Backbone = require 'backbone'
MerryGoRoundNavView = require './view.coffee'
MerryGoRoundFlickity = require './wrapper.coffee'

setup = ($el, options = {}, callback) ->
  $viewport = $el.find options.selector or '.js-mgr-cells'
  $navigation = $el.find options.navigationSelector or '.js-mgr-navigation'
  $cells = $viewport.find options.cellSelector or '.js-mgr-cell'

  totalWidth = _.reduce $cells, ((memo, el) -> $(el).width() + memo), 0
  averageWidth = totalWidth / $cells.length
  options.wrapAround = (totalWidth - averageWidth) >= $(window).width()

  {
    cells: cells = new MerryGoRoundFlickity $viewport, options
    navigation: new MerryGoRoundNavView flickity: cells.flickity, el: $navigation
  }

module.exports = ($el, options = {}, callback) ->
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
