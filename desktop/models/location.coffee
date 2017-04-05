_ = require 'underscore'
Backbone = require 'backbone'
{ compactObject } = require './mixins/compact_object'

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
      @get 'address' or ''
      @get 'address_2' or ''
      @cityStatePostalCode() or ''
      @get 'country' or ''
    ])

  cityState: ->
    _.compact([
      @get 'city' or ''
      @get 'state' or ''
    ]).join(', ')

  cityStateCountry: ->
    _.compact([
      @get 'city' or ''
      @get 'state' or ''
      @get 'country' or ''
    ]).join(', ')

  cityStatePostalCode: ->
    _.compact([
      @cityState() or ''
      @get('postal_code') or ''
    ]).join(' ')

  cityPhone: ->
    _.compact([
      @get('city')
      @get('phone')
    ]).join(': ')

  singleLine: ->
    _.compact([
      @get 'city' or ''
      _.compact([
        @get 'address' or ''
        @get 'address_2' or ''
      ]).join(' ')
    ]).join(', ')

  singleWord: ->
    @get 'city' or
    @get 'country'

  toHtml: ->
    telephone = "Tel: #{@get('phone')}" if @get('phone')
    _.compact(_.flatten([@lines(), telephone])).join '<br/>'

  displayAddress: ->
    if @lines() then @lines().join(", ") else ""

  displayName: ->
    if @has("display") then @get("display") else @get("name")

  getMapsLocation: ->
    if @get('coordinates')
      "#{@get('coordinates').lat},#{@get('coordinates').lng}"
    else
      @displayAddress()

  toString: ->
    @cityStateCountry()

  toJSONLD: ->
    address = [@get('address') or '', @get('address_2') or ''].join('')
    compactObject {
      "@type": "Place"
      name: @get('name')
      address: compactObject {
        "@type": "PostalAddress"
        streetAddress: address
        addressLocality: @get('city')
        addressRegion: @get('state')
        postalCode: @get('postal_code')
        addressCountry: if @get('country')?.length > 0 then @get('country')
      }
    }
