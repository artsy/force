{ GEMINI_CLOUDFRONT_URL } = require('sharify').data
config = require '../config.coffee'
resizer = require './index.coffee'

module.exports = gemini =
  endpoint: GEMINI_CLOUDFRONT_URL

  resize: resizer.resize (src, width, height, quality) ->
    resize_to = if width? and not height?
      'width'
    else if height? and not width?
      'height'
    else
      'fit'

    resizer.exec gemini.endpoint, null,
      resize_to: resize_to
      src: src
      width: width if width?
      height: height if height?
      quality: quality

  crop: crop = resizer.crop (src, width, height, quality) ->
    resizer.exec gemini.endpoint, null,
      resize_to: 'fill'
      src: src
      width: width
      height: height
      quality: quality or config.quality

  fill: crop
