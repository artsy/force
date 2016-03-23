{ pick } = require 'underscore'

module.exports = (sd, { artwork }) ->
  __artwork__ = pick artwork, 'id', 'title', 'partner', 'fair', 'image'
  __artwork__.fair = pick __artwork__.fair, 'id', 'name'
  __artwork__.partner = pick __artwork__.partner, 'id', 'name'
  sd.INQUIRY = artwork: __artwork__
