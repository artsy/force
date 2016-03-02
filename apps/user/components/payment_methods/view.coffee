Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class PaymentMethodsView extends Backbone.View
  className: 'settings-payment-methods'

  events:
    'click .js-settings-payment-methods__add': 'add'

  initialize: ({ @user }) -> #

  fetch: ->
    #

  add: (e) ->
    e.preventDefault()
    #

  render: ->
    @$el.html template()
    this
