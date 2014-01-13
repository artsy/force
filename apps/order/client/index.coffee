_            = require 'underscore'
Backbone     = require 'backbone'
Order        = require '../../../models/order.coffee'
ShippingView = require('./shipping.coffee').ShippingView
CheckoutView = require('./checkout.coffee').CheckoutView
sd           = require('sharify').data

module.exports.OrderRouter = class OrderRouter extends Backbone.Router

  routes:
    'order/checkout' : 'checkout'
    'order'          : 'shipping'

  checkout: -> new CheckoutView(model: new Order(sd.ORDER), el: $('#order-page'))
  shipping: -> new ShippingView(model: new Order(sd.ORDER), el: $('#order-page'))

module.exports.init = ->
  new OrderRouter
  Backbone.history.start(pushState: true)
