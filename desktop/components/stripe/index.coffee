Q = require 'bluebird-q'
{ reduce, every, identity } = require 'underscore'
{ STRIPE_PUBLISHABLE_KEY } = require('sharify').data

module.exports =
  initialize: ->
    Stripe.setPublishableKey STRIPE_PUBLISHABLE_KEY

  error: (key) -> {
    number: 'Your card number is incorrect.'
    exp: 'Your card’s expiration year is invalid.'
    cvc: 'Your card’s security code is invalid.'
  }[key]

  validate: validate = ({ number, exp, cvc }) -> [
    { name: 'number', value: Stripe.card.validateCardNumber number }
    { name: 'exp', value: Stripe.card.validateExpiry exp }
    { name: 'cvc', value: Stripe.card.validateCVC cvc }
  ]

  isValid: ->
    every (validate arguments...), ({ value }) -> value

  serialize: ($form) ->
    reduce $form.find('[data-stripe]'), (memo, el) ->
      $el = $(el)
      memo[$el.data 'stripe'] = $el.val()
      memo
    , {}

  tokenize: (obj) ->
    Q.promise (resolve, reject) ->
      Stripe.card.createToken obj, (status, data) ->
        if status is 200
          resolve data
        else
          reject data.error.message

  cardType: (number) ->
    Stripe.card.cardType number
