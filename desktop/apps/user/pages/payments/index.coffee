{ invoke } = require 'underscore'
Backbone = require 'backbone'
PaymentMethodsView = require '../../components/payment_methods/view'
template = -> require('./index.jade') arguments...

module.exports = class PaymentsView extends Backbone.View
  subViews: []

  className: 'settings-page__payments'

  initialize: ({ @user }) -> #

  postRender: ->
    paymentMethodsView = new PaymentMethodsView collection: @user.related().creditCards
    @$('.js-settings-section__main--payment-methods')
      .html paymentMethodsView.render().$el
    paymentMethodsView.fetch()

    @subViews = [
      paymentMethodsView
    ]

  render: ->
    @$el.html template
      user: @user
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
