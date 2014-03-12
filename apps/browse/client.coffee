Backbone = require 'backbone'
iframePopover = require '../../components/iframe_popover/index.coffee'
FilterArtworksView = require '../../components/filter/artworks/view.coffee'
{ ARTSY_URL } = require('sharify').data

module.exports.index = ->
  { params } = new FilterArtworksView
    el: $ '#browse-filter'
    artworksUrl: "#{ARTSY_URL}/api/v1/search/filtered/main"
    countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/main/suggest"
    urlRoot: "browse"
  Backbone.history.start pushState: true
  iframePopover $('#browse-filter')

module.exports.categories = ->
  $('#browse-header .avant-garde-button-text').click ->
    $("html, body").animate scrollTop: $('#browse-az-header').offset().top