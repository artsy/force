Backbone = require 'backbone'
openCreditCardModal = require '../../../../components/credit_card_2/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class PaymentMethodsView extends Backbone.View
  className: 'settings-payment-methods'

  events:
    'click .js-add': 'add'
    'click .js-delete': 'delete'

  initialize: ({ @user }) ->
    @collection = @user.related().creditCards

    @listenTo @collection, 'add remove sync destroy', @render

  fetch: ->
    @collection.fetch()

  add: (e) ->
    e.preventDefault()
    openCreditCardModal user: @user

  delete: (e) ->
    e.preventDefault()

    id = $(e.currentTarget)
      .attr 'data-state', 'loading'
      .data 'id'

    @collection
      .get id
      .destroy()

  render: ->
    @$el.html template
      cards: @collection.toJSON()
    this
