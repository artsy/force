_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'
CurrentUser     = require '../../../models/current_user.coffee'
Sale            = require '../../../models/sale.coffee'
RegistrationForm = require './registration_form.coffee'

module.exports.AuctionRouter = class AuctionRouter extends Backbone.Router

  routes:
    'auction-registration/:id' : 'register'

  initialize: (options) ->
    { @sale } = options

  register: ->
    new RegistrationForm
      el: $('#auction-registration-page')
      model: @sale

module.exports.init = ->
  new AuctionRouter
    sale: new Sale sd.SALE

  Backbone.history.start(pushState: true)
