{ extend } = require 'underscore'
Backbone = require 'backbone'
{ Countries } = require 'places'
Form = require '../form/index'
stripe = require '../stripe/index'
jQueryPayment = -> require 'jquery.payment'
template = -> require('./index.jade') arguments...

module.exports = class CreditCardView extends Backbone.View
  className: 'credit-card-form'

  events:
    'input .js-cc-number': 'type'
    'click button': 'submit'
    'input input': 'change'

  initialize: ->
    stripe.initialize()
    jQueryPayment()

  type: (e) ->
    number = $(e.currentTarget).val()
    provider = stripe.cardType number
    (@$type ?= @$('.js-cc-type'))
      .attr 'data-provider', provider

  change: ->
    return if @__changed__

    @__changed__ = yes

    @$('button')
      .removeClass 'avant-garde-button-white'
      .addClass 'avant-garde-button-black'

  validate: (sensitive, validator) ->
    stripe.validate(sensitive).map ({ name, value }) ->
      $input = @$("[data-stripe='#{name}']")
      if value
        validator.clearValidity $input
      else
        validator.setValidity $input, stripe.error(name)

  submit: (e) ->
    e.preventDefault()

    form = new Form $form: $form = @$('form')

    sensitive = stripe.serialize $form
    @validate sensitive, form.validator

    return unless form.isReady()

    form.state 'loading'

    data = extend {}, sensitive, form.data()

    @__submit__ = stripe.tokenize data
      .then ({ id }) =>
        @collection.create { token: id, provider: 'stripe' },
          success: -> form.state 'default' # `create` returns model, not Promise

      .catch (err) ->
        form.error err

  postRender: ->
    @$('[data-stripe="number"]')
      .payment 'formatCardNumber'

    @$('[data-stripe="exp"]')
      .payment 'formatCardExpiry'

    @$('[data-stripe="cvc"]')
      .payment 'formatCardCVC'

  render: ->
    @$el.html template
      countries: Countries
    @postRender()
    this
