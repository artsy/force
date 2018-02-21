Backbone = require 'backbone'
ProfessionalBuyerRouter = require './router.coffee'

module.exports = ->
  router = new ProfessionalBuyerRouter
  Backbone.history.start pushState: true
