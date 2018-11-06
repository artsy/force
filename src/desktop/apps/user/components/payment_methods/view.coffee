{ invoke } = require 'underscore'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...
sd = require('sharify').data

module.exports = class PaymentMethodsView extends Backbone.View
  subViews: []

  className: 'settings-payment-methods'

  initialize: ->
    @listenTo @collection, 'add remove sync destroy', @render

  render: ->
    @$el.html template
      stitch: sd.stitch

  remove: ->
    invoke @subViews, 'remove'
    super
