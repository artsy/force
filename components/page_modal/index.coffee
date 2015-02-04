Backbone = require 'backbone'
PageModalRouter = require './router.coffee'

module.exports = (selector, routes) ->
  router = new PageModalRouter routes

  Backbone.history.start(pushState: true) unless Backbone.History.started

  $(document).on 'click', selector, (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), trigger: true
