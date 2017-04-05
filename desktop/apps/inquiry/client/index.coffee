Backbone = require 'backbone'

class Router extends Backbone.Router
  routes:
    'inquiry/development': 'development'
    'inquiry/debug/:artwork/:bypass': 'inquiry'
    'inquiry/:artwork': 'inquiry'
    'inquiry/:id/user_outcome': 'user_outcome'

  development: require './routes/development'
  inquiry: require './routes/inquiry'
  user_outcome: require './routes/user_outcome'

module.exports = ->
  router = new Router
  Backbone.history.start pushState: true
