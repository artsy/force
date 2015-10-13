Backbone = require 'backbone'

class Router extends Backbone.Router
  routes:
    'inquiry/development': 'development'
    'inquiry/debug/:artwork/:bypass': 'inquiry'
    'inquiry/:artwork': 'inquiry'

  development: require './routes/development.coffee'
  inquiry: require './routes/inquiry.coffee'

module.exports = ->
  router = new Router
  Backbone.history.start pushState: true
