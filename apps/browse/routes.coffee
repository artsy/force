FilterArtworks = require '../../collections/filter_artworks'

@index = (req, res) ->
  # just getting the aggregates
  filterArtworks = new FilterArtworks
  filterArtworks.fetch
    cache: true
    data:
      size: 0
    success: ->
      res.render 'index',
        filterRoot: '/browse/artworks'
        counts: filterArtworks.counts
