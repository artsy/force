{ map, pick } = require 'underscore'

module.exports = (sd, { artwork }) ->
  if { images } = artwork
    sd.DEEP_ZOOM = images: map images, (image) ->
      pick image, 'id', 'deep_zoom'
