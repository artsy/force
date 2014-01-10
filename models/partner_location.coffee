_                              = require 'underscore'
Backbone                       = require 'backbone'
{ getMapImageSrc, getMapLink } = require "../components/util/google_maps.coffee"

module.exports = class PartnerLocation extends Backbone.Model

  lines: ->
    _.compact([
      @get 'address' || ''
      @get 'address_2' || ''
      @cityStatePostalCode() || ''
      @get 'country' || ''
    ])

  cityState: ->
    _.compact([
      @get 'city' || ''
      @get 'state' || ''
    ]).join(', ')

  cityStatePostalCode: ->
    _.compact([
      @cityState() || ''
      @get('postal_code') || ''
    ]).join(' ')

  singleLine: ->
    _.compact([
      @get 'city' || ''
      _.compact([
        @get 'address' || ''
        @get 'address_2' || ''
      ]).join(' ')
    ]).join(', ')

  toHtml: ->
    telephone = "Tel: #{@get('phone')}" if @get('phone')
    _.compact(_.flatten([@lines(), telephone])).join '<br/>'

  displayAddress: -> if @lines() then @lines().join(", ") else ""

  displayName: -> if @has("display") then @get("display") else @get("name")

  googleMapsLink: ->
    location = @displayAddress()
    return unless location
    getMapLink location

  mapImageSrc: (width, height) ->
    location = @displayAddress()
    return unless location

    getMapImageSrc(
      size: "#{width}x#{height}"
      center:  location
      markers: "color:0x873ff0|#{location}"
    )
