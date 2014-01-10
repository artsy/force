analytics = require '../../../lib/analytics.coffee'
_         = require 'underscore'
Backbone  = require 'backbone'
sd        = require('sharify').data

module.exports.SearchResultsView = class SearchResultsView extends Backbone.View

  el: '#search-page'

  events:
    'click .search-result' : 'trackClick'

  trackClick: ->
    analytics.track.click "Selected item from results page", query: $('#main-layout-search-bar-input').val()

module.exports.init = ->
  new SearchResultsView
    query: sd.query
