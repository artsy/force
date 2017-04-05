{ DEEP_ZOOM } = require('sharify').data
{ findWhere } = require 'underscore'
DeepZoomView = require './view'

module.exports = (id) ->
  { deep_zoom } = findWhere DEEP_ZOOM.images, id: id

  view = new DeepZoomView image: deep_zoom
  $('body').prepend view.render().$el
