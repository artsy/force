_                              = require 'underscore'
Backbone                       = require 'backbone'
Location                       = require './location.coffee'
{ getMapImageSrc, getMapLink } = require "../components/util/google_maps.coffee"
{ Markdown }                   = require 'artsy-backbone-mixins'

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

  mapImageSrc: (width, height) ->
    location = @getMapsLocation()
    return unless location

    getMapImageSrc(
      size: "#{width}x#{height}"
      center:  location
      markers: "color:0x873ff0|#{location}"
    )
