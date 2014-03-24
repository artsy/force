_                              = require 'underscore'
Backbone                       = require 'backbone'

module.exports = class Location extends Backbone.Model

  defaults: ->
    raw: ''
    address: ''
    address_2: ''
    city: ''
    state: ''
    state_code: ''
    postal_code: ''
    country: ''
    coordinates: null
    summary: ''

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

  cityStateCountry: ->
    _.compact([
      @get 'city' || ''
      @get 'state' || ''
      @get 'country' || ''
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

  getMapsLocation: ->
    if @get('coordinates')
      "#{@get('coordinates').lat},#{@get('coordinates').lng}"
    else
      @displayAddress()

  setFromGoogleResult: (result) ->
    loc = new GeoFormatter(result)
    @reset(
      city: loc.getCity() || ''
      state: loc.getState() || ''
      state_code: loc.getStateCode() || ''
      postal_code: loc.getPostalCode() || ''
      country: loc.getCountry() || ''
      coordinates: loc.getCoordinates() || null
    )
