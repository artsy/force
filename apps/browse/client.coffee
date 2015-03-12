Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
FilterArtworksView = require '../../components/filter/artworks/view.coffee'
{ API_URL } = require('sharify').data

module.exports.init = ->
  { params } = new FilterArtworksView
    el: $ '#browse-filter'
    artworksUrl: "#{API_URL}/api/v1/search/filtered/main"
    countsUrl: "#{API_URL}/api/v1/search/filtered/main/suggest"
    urlRoot: "browse"
  Backbone.history.start pushState: true
  scrollFrame '#browse-filter a'
  params.trigger 'reset'
