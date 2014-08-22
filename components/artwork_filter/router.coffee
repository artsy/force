_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
ArtworkFilterView = require './view.coffee'

module.exports = class ArtworkFilterRouter extends Backbone.Router
  initialize: (options = {}) ->
    @view = new ArtworkFilterView options
    @view.on 'navigate', => @navigate @currentFragment()
    @navigateBasedOnParams()

  currentFragment: ->
    fragment = location.pathname
    fragment += "?#{params}" if params = @params()
    fragment

  params: ->
    qs.stringify @view.filter.selected.attributes

  navigateBasedOnParams: ->
    params = qs.parse location.search.substring(1)
    @view.filter.by params unless _.isEmpty(params)
