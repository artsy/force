qs = require 'querystring'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
PageModalView = require './view.coffee'

module.exports = class PageModalRouter extends Backbone.Router
  initialize: (routes) ->
    @path = location.pathname

    for route, handler of routes
      @route route, handler

    mediator.on 'modal:closed', @__return__

  close: ->
    mediator.trigger 'modal:close'

  modal: ->
    new PageModalView
      src: @__src__()
      dimensions:
        width: '90%'
        height: '90%'
        maxWidth: '1200px'
        maxHeight: '700px'

  __src__: ->
    fragment = "/#{Backbone.history.fragment}"
    [path, query] = fragment.split '?'
    query = qs.parse(query) or {}
    query.modal = true
    path + '?' + qs.stringify(query)

  __return__: =>
    return if @path is location.pathname
    history.back()
