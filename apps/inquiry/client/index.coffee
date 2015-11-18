Backbone = require 'backbone'

class Router extends Backbone.Router
  routes:
    'inquiry/development': 'development'
    'inquiry/debug/:artwork/:bypass': 'inquiry'
    'inquiry/:artwork': 'inquiry'
    'inquiry/:id/user_outcome': 'user_outcome'

  development: require './routes/development.coffee'
  inquiry: require './routes/inquiry.coffee'
  user_outcome: require './routes/user_outcome.coffee'

module.exports = ->
  router = new Router
  Backbone.history.start pushState: true
