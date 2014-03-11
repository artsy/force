FilterArtworksView = require '../../components/filter/artworks/view.coffee'
{ ARTSY_URL } = require('sharify').data

module.exports.init = ->
  { params } = new FilterArtworksView
    el: $ '#browse-filter'
    artworksUrl: "#{ARTSY_URL}/api/v1/search/filtered/main"
    countsUrl: "#{ARTSY_URL}/api/v1/search/filtered/main/suggest"
  params.trigger 'reset'