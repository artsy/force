{ invoke } = require 'underscore'
Backbone = require 'backbone'
CreditCardView = require '../view'
template = -> require('./index.jade') arguments...

module.exports = class CreditCardModalView extends Backbone.View
  className: 'credit-card-modal'

  events:
    'click .js-cancel': 'cancel'

  initialize: ->
    @listenTo @collection, 'add', @done

  done: (model) ->
    model.once 'sync', =>
      @trigger 'done'

  cancel: (e) ->
    e.preventDefault()
    @trigger 'abort'

  postRender: ->
    creditCardView = new CreditCardView
      el: @$el
      collection: @collection

    @subViews = [
      creditCardView
    ]

  render: ->
    @$el.html template()
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
    super
