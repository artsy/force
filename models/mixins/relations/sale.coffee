module.exports =
  related: ->
    return @__related__ if @__related__?

    SaleArtworks = require '../../../collections/sale_artworks.coffee'
    Artworks = require '../../../collections/artworks.coffee'
    Feature = require '../../feature.coffee'

    saleArtworks = new SaleArtworks [], id: @id
    artworks = new Artworks
    feature = new Feature

    @__related__ =
      saleArtworks: saleArtworks
      artworks: artworks
      feature: feature
