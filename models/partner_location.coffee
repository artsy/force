_        = require 'underscore'
sd       = require('sharify').data
Backbone = require 'backbone'

module.exports = class PartnerLocation extends Backbone.Model

  addressLines: ->
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

  toString: ->
    @addressLines().join ', '
