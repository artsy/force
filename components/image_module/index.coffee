_ = require 'underscore'
{ Freewall } = require 'freewall'
{ crop } = require '../resizer/index.coffee'
template = -> require('./template.jade') arguments...

dimensions = ($el) ->
  [$el.outerWidth(), $el.outerHeight()]

module.exports = ($el, images) ->
  [width, height] = dimensions $el

  max = width: ((width / 3) * 2), height: height
  $el.html template(images: images.models, max: max)

  selector = '.image-module-image'

  wall = new Freewall $el
  wall.reset
    selector: selector
    animate: false
    cellW: Math.ceil(width / 3)
    cellH: Math.ceil(height / 2)
    onResize: ->
      @fitZone dimensions($el)...
  wall.fitZone dimensions($el)...
