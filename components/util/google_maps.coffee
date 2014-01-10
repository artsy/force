_  = require 'underscore'
sd = require('sharify').data

# Helpers for getting Google maps urls
module.exports =

  getMapImageSrc: (options) ->
    options = _.defaults({}, options,
      maptype : 'roadmap'
      sensor  : false
      style   : 'lightness:50|saturation:-100'
      zoom    : 16
      key     : sd.GOOGLE_MAPS_API_KEY
      sensor  : false
    )
    "http://maps.googleapis.com/maps/api/staticmap?#{$.param(options)}"

  getMapLink: (location) ->
    options =
      q     : location
      hnear : location
    "https://maps.google.com/maps?#{$.param(options)}"
