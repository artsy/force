Backbone     = require 'backbone'
ShippingForm = require('./shipping_form.coffee').ShippingForm

module.exports.ShippingView = class ShippingView extends Backbone.View

  el: '#order-page'

  initialize: ->
    new ShippingForm
      el     : @$el
      model  : @model
      success: ->
        window.location = 'order/shipping'
