Backbone = require 'backbone'
ProfessionalBuyerRouter = require './router'

module.exports = ->
  router = new ProfessionalBuyerRouter
  Backbone.history.start pushState: true
