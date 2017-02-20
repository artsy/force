_ = require 'underscore'
Backbone = require 'backbone'
Relations = require './mixins/relations/location.coffee'

module.exports = class Location extends Backbone.Model

  _.extend @prototype, Relations

  cityStateCountry: ->
    _.compact([
      @get 'city' || ''
      @get 'state' || ''
      @get 'country' || ''
    ]).join(', ')

  singleLine: ->
    _.compact([
      @get 'city' or ''
      _.compact([
        @get 'address' or ''
        @get 'address_2' or ''
      ]).join(' ')
    ]).join(', ')
