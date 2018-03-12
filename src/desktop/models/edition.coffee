_ = require 'underscore'
Backbone = require 'backbone'
{ Dimensions } = require 'artsy-backbone-mixins'

module.exports = class Edition extends Backbone.Model
  _.extend @prototype, Dimensions

  priceDisplay: ->
    unless _.isEmpty(@get('price'))
      @get('price')
    else
      if @get('forsale')
        'Available'
      else
        'Not for Sale'
