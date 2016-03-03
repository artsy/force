Backbone = require 'backbone'
openCreditCardModal = require '../../../../components/credit_card_2/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class PaymentMethodsView extends Backbone.View
  className: 'settings-payment-methods'

  events:
    'click .js-settings-payment-methods__add': 'add'

  initialize: ({ @user }) ->
    @listenTo @user.related().creditCards, 'sync', @render

  fetch: ->
    @user.related().creditCards.fetch()

  add: (e) ->
    e.preventDefault()
    openCreditCardModal user: @user

  render: ->
    @$el.html template
      cards: @user.related().creditCards.toJSON()
    this
