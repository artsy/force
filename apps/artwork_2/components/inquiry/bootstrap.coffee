{ tap, pick } = require 'underscore'

module.exports = (sd, { artwork }) ->
  __artwork__ = pick artwork, 'id', 'title', 'partner', 'fair', 'images'
  __artwork__.fair = pick __artwork__.fair, 'id', 'name'
  __artwork__.partner = pick __artwork__.partner, 'id', 'name'
  __artwork__.images = __artwork__.images.map (image) ->
    tap {}, (x) ->
      x.versions = ['medium'] # Trick model into returning image URL
      x.image_url = image.url

  sd.INQUIRY = artwork: __artwork__
