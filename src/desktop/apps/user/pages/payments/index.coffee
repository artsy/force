{ invoke } = require 'underscore'
Backbone = require 'backbone'
PaymentMethodsView = require '../../components/payment_methods/view.coffee'
template = -> require('./index.jade') arguments...
sd = require('sharify').data

module.exports = class PaymentsView extends Backbone.View
  subViews: []

  className: 'settings-page__payments'

  initialize: ({ @user }) -> #

  postRender: ->
    paymentMethodsView = new PaymentMethodsView collection: @user.related().creditCards
    @$('.js-settings-section__main--payment-methods')
      .html paymentMethodsView.render().$el

  render: ->
    @$el.html template
      user: @user
      stitch: sd.stitch
    @postRender()
    this
