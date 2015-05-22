_ = require 'underscore'
{ Freewall } = require 'freewall'
{ crop } = require '../resizer/index.coffee'
template = -> require('./template.jade') arguments...

module.exports = ($el, images, height = 450) ->
  width = $el.outerWidth()

  max = width: ((width / 3) * 2), height: height

  $el
    .css height: height
    .html template(images: images.models, max: max)

  selector = '.image-module-image'

  wall = new Freewall $el

  wall.reset
    selector: selector
    animate: false
    cellW: Math.ceil(width / 3)
    cellH: Math.ceil(height / 2)
    onResize: ->
      @fitZone $el.width(), height

  wall.fitZone width, height
