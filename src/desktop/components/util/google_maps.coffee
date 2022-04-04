_ = require 'underscore'
sd = require('sharify').data
qs = require('qs')

# Helpers for getting Google maps urls
module.exports =

  getMapImageSrc: (options) ->
    options = _.defaults({}, options,
      maptype: 'roadmap'
      sensor: false
      style: 'lightness:50|saturation:-100'
      zoom: 16
      sensor: false
    )
    if sd.PUBLIC_GOOGLE_MAPS_API_KEY
      options.key = sd.PUBLIC_GOOGLE_MAPS_API_KEY
    "https://maps.googleapis.com/maps/api/staticmap?#{qs.stringify(options)}"

  getMapLink: (options) ->
    "https://maps.google.com/maps?#{qs.stringify(options)}"

  getDirections: (options) ->
    if sd.PUBLIC_GOOGLE_MAPS_API_KEY
      options.key = sd.PUBLIC_GOOGLE_MAPS_API_KEY

    "https://www.google.com/maps/dir/#{encodeURI(options.origin)}/#{options.destination}"
