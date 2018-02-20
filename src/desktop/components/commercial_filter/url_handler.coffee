Backbone = require 'backbone'
qs = require 'qs'
collectPageTitle = require './page_title.coffee'
{ PAGE_TITLE_FILTERS } = require('sharify').data

module.exports = class UrlHandler extends Backbone.Router

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenTo @params, 'change', @setURLAndTitle

  currentPath: ->
    params = qs.stringify @params.whitelisted()
    fragment = location.pathname
    fragment += "?#{params}" if params
    fragment

  setURLAndTitle: ->
    document.title = collectPageTitle(@params.whitelisted(), PAGE_TITLE_FILTERS)
    @navigate @currentPath(), replace: true
