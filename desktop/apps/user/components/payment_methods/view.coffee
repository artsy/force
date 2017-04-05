{ invoke } = require 'underscore'
Backbone = require 'backbone'
openCreditCardModal = require '../../../../components/credit_card_2/modal/index'
template = -> require('./index.jade') arguments...
CreditCardView = require '../../../../components/credit_card_2/view'

module.exports = class PaymentMethodsView extends Backbone.View
  subViews: []

  className: 'settings-payment-methods'

  events:
    'click .js-add': 'add'
    'click .js-delete': 'delete'

  initialize: ->
    @listenTo @collection, 'add remove sync destroy', @render

  fetch: ->
    @collection.fetch()

  add: (e) ->
    e.preventDefault()
    openCreditCardModal collection: @collection

  delete: (e) ->
    e.preventDefault()

    id = $(e.currentTarget)
      .attr 'data-state', 'loading'
      .data 'id'

    @collection
      .get id
      .destroy()

  render: ->
    if @collection.length
      @$el.html template
        cards: @collection.toJSON()

    else
      creditCardView = new CreditCardView collection: @collection
      @$el.html creditCardView.render().$el
      @subViews = [
        creditCardView
      ]

    this

  remove: ->
    invoke @subViews, 'remove'
    super
