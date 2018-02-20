_ = require 'underscore'
Backbone = require 'backbone'
Location = require './location.coffee'
{ getMapImageSrc, getMapLink, getDirections } = require "../components/util/google_maps.coffee"
{ Markdown } = require 'artsy-backbone-mixins'

module.exports = class PartnerLocation extends Location

  _.extend @prototype, Markdown

  googleMapsLink: ->
    location = @getMapsLocation()
    return unless location
    options =
      q: location
    unless @has('coordinates')
      options.hnear = location
    getMapLink options

  mapImageSrc: (width, height, scale = 1, zoom = 16) ->
    location = @getMapsLocation()
    return unless location

    getMapImageSrc(
      size: "#{width}x#{height}"
      center: location
      markers: "color:0x873ff0|#{location}"
      scale: scale
      zoom: zoom
    )

  mapDirections: (origin) ->
    location = @getMapsLocation()
    return unless location

    options =
      origin: origin
      destination: location

    getDirections options
