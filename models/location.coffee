_                              = require 'underscore'
Backbone                       = require 'backbone'
{ compactObject } = require './mixins/compact_object.coffee'

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

  toJSONLD: ->
    address = [@get('address') || '', @get('address_2') || ''].join('')
    compactObject {
      "@type": "Place"
      name: @get('name')
      address: compactObject {
        "@type": "PostalAddress"
        streetAddress : address
        addressLocality: @get('city')
        addressRegion: @get('state')
        postalCode: @get('postal_code')
        addressCountry: if @get('country')?.length > 0 then @get('country')
      }
    }
