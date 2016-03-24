{ pick } = require 'underscore'

module.exports = (sd, { artwork }) ->
  if { banner } = artwork
    sd.BANNER = pick banner, 'end_at'
