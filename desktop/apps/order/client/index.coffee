_ = require 'underscore'
Backbone = require 'backbone'
Order = require '../../../models/order'
ShippingForm = require('./shipping_form')
CheckoutForm = require('./checkout_form')
sd = require('sharify').data

module.exports.OrderRouter = class OrderRouter extends Backbone.Router

  routes:
    'order/checkout': 'checkout'
    'order': 'shipping'

  shipping: ->
    new ShippingForm
      model: new Order(sd.ORDER)
      el: $('#order-page')
      success: ->
        location.assign '/order/checkout?stop_microgravity_redirect=true'

  checkout: ->
    new CheckoutForm
      model: new Order(sd.ORDER)
      el: $('#order-page')
      success: ->

module.exports.init = ->
  new OrderRouter
  Backbone.history.start(pushState: true)
