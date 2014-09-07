_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
ArtworkFilterView = require './view.coffee'

module.exports = class ArtworkFilterRouter extends Backbone.Router

  ignoredParams = ['utm_source', 'utm_campaign', 'utm_medium']

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

  searchString: ->
    location.search.substring(1)

  navigateBasedOnParams: ->
    params = _.omit(qs.parse(@searchString()), ignoredParams)
    @view.filter.by params unless _.isEmpty(params)
