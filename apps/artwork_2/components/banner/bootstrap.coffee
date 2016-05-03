{ pick } = require 'underscore'

module.exports = (sd, { artwork }) ->
  if { banner } = artwork
    sd.BANNER = pick banner, 'start_at', 'end_at'
