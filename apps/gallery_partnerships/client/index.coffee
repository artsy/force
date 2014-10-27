Backbone  = require 'backbone'
Router    = require './router.coffee'
{ track } = require '../../../lib/analytics.coffee'

module.exports.init = ->
  new Router
  Backbone.history.start pushState: true
  track.impression 'Gallery partnerships page'
