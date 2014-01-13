Backbone     = require 'backbone'
CheckoutForm = require('./checkout_form.coffee').CheckoutForm

module.exports.CheckoutView = class CheckoutView extends Backbone.View

  el: '#order-page'

  initialize: ->
    new CheckoutForm
      el     : @$el
      model  : @model
      success: ->
        window.location = 'order/complete'
