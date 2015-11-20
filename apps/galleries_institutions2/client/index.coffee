Backbone = require 'backbone'

class Router extends Backbone.Router
  routes:
    'galleries2': 'index'
    'institutions2': 'index'

  index: require './routes/index.coffee'

module.exports.init = ->
  router = new Router
  Backbone.history.start pushState: true
