Filter = require '../../components/commercial_filter/models/filter.coffee'
ArtworkColumnsView = require '../../components/artwork_columns/view.coffee'
sd = require('sharify').data

module.exports.init = ->
  filter = new Filter()
  filter.fetch().then ({ artworks, aggregations }) ->
    view = new ArtworkColumnsView
      collection: artworks
      el: $('#browse-page')
      allowDuplicates: true
      numberOfColumns: 4
