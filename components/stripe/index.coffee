Q = require 'bluebird-q'
{ reduce, every, identity } = require 'underscore'
{ STRIPE_PUBLISHABLE_KEY } = require('sharify').data

module.exports =
  initialize: ->
    Stripe.setPublishableKey STRIPE_PUBLISHABLE_KEY

  validate: validate = ({ number, exp, cvc }) ->
    number: Stripe.card.validateCardNumber number
    exp: Stripe.card.validateExpiry exp
    cvc: Stripe.card.validateCVC cvc

  isValid: ->
    every (validate arguments...), identity

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
