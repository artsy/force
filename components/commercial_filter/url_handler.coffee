Backbone = require 'backbone'
qs = require 'qs'

module.exports = class UrlHandler extends Backbone.Router

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenTo @params, 'change', @setURL

  currentPath: ->
    params = qs.stringify @params.whitelisted()
    fragment = location.pathname
    fragment += "?#{params}" if params
    fragment

  setURL: ->
    @navigate @currentPath(), replace: true
