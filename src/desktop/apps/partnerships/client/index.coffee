Backbone = require 'backbone'
Router = require './router.coffee'
initMobile = require('./mobile/index.coffee').init
sd = require('sharify').data

module.exports.init = ->
  if sd.IS_MOBILE
    initMobile()
  else
    new Router
    Backbone.history.start pushState: true

