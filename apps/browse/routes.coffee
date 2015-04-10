FilterArtworks = require '../../collections/filter_artworks'

@index = (req, res) ->
  # just the aggregates, we don't need the works
  filterArtworks = new FilterArtworks
  filterArtworks.fetch
    cache: true
    data:
      size: 0
    success: ->
      res.render 'index',
        filterRoot: '/browse/artworks'
        counts: filterArtworks.counts
