_ = require 'underscore'
sd = require('sharify').data
querystring = require 'querystring'
Backbone = require 'backbone'
{ Markdown } = require 'artsy-backbone-mixins'
Relations = require './mixins/relations/location'
Location = require './location'

module.exports = class PartnerLocation extends Location

  _.extend @prototype, Markdown

  fullAddress: ->
    lines = [
      @get('address')
      @get('address2')
      "#{@get('city')}, #{@get('state')} #{@get('postal_code')}"
      @get('country')
    ]
    if lines.length then (line for line in lines when line).join(', ') else ''

  phoneHref: ->
    if @has 'phone'
      "tel:#{@get('phone').replace(/\D/g, '')}"
    else
      ''

  cityState: ->
    _.compact([@get('city'), @get('state')]).join(', ')

  cityStateCountry: ->
    _.compact([
      @get 'city' || ''
      @get 'state' || ''
      @get 'country' || ''
    ]).join(', ')

  center: ->
    if @has('coordinates')
      "#{@get('coordinates').lat},#{@get('coordinates').lng}"
    else
      @fullAddress()

  gmapLink: ->
    "https://maps.google.com/maps?#{querystring.stringify({ q: @center() })}"

  gmapImageUrl: (size = '600x150') ->
    options =
      center: @center()
      markers: "color:0x873ff0|#{@center()}"
      maptype: 'roadmap'
      sensor: 'false'
      style: 'lightness:50|saturation:-100'
      zoom: '16'
      key: sd.GOOGLE_MAPS_API_KEY
      size: size
    "http://maps.googleapis.com/maps/api/staticmap?#{querystring.stringify(options)}"
