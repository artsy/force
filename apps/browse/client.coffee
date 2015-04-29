_ = require 'underscore'
Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
qs = require 'querystring'
FilterArtworks = require '../../collections/filter_artworks.coffee'
FilterView = require '../../components/filter2/view.coffee'
FilterRouter = require '../../components/filter2/router/index.coffee'
{ FILTER_ROOT } = require('sharify').data

module.exports.init = ->
  queryParams = qs.parse(location.search.replace(/^\?/, ''))
  params = new Backbone.Model _.extend queryParams, { page: 1, size: 10 }
  collection = new FilterArtworks

  view = new FilterView
    el: $ '#browse-filter'
    collection: collection
    params: params

  router = new FilterRouter
    params: params
    urlRoot: FILTER_ROOT

  collection.fetch
    data: params.toJSON()
    success: ->
      collection.trigger 'initial:fetch'

  Backbone.history.start pushState: true
  scrollFrame '#browse-filter a'
