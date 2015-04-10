Backbone = require 'backbone'
scrollFrame = require 'scroll-frame'
FilterArtworksView = require '../../components/filter2/artworks/view.coffee'
{ API_URL } = require('sharify').data

module.exports.init = ->
  new FilterArtworksView
    el: $ '#browse-filter'
    urlRoot: 'browse'
  Backbone.history.start pushState: true
  scrollFrame '#browse-filter a'
