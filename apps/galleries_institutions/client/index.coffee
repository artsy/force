Backbone = require 'backbone'

class Router extends Backbone.Router
  routes:
    'galleries': 'galleries'
    'institutions': 'institutions'

  index: require './routes/index.coffee'

  galleries: ->
    @index('gallery')

  institutions: ->
    @index('institution')

module.exports = ->
  router = new Router
  Backbone.history.start pushState: true
