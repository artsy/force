_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'qs'

module.exports = class UrlUpdater extends Backbone.Router

  initialize: ({ @filterState }) ->
    @listenTo @filterState, 'change', @updateURL
    @firstLoad = true
    Backbone.history.start pushState: true

  paramsForUrl: ->
    params = _.pick @filterState.attributes, [ 'artist', 'forSale' ]
    filteredParams = _.omit params, (val, key) ->
      not val?
    { artist: filteredParams.artist, for_sale: filteredParams.forSale }

  currentPath: ->
    params = qs.stringify @paramsForUrl()

    fragment = location.pathname
    fragment += "?#{params}" if params
    fragment

  updateURL: ->
    unless @firstLoad
      @navigate @currentPath(), replace: true
    @firstLoad = false
