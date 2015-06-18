module.exports =
  related: ->
    return @__related__ if @__related__?

    SaleArtworks = require '../../../collections/sale_artworks.coffee'
    Artworks = require '../../../collections/artworks.coffee'
    Feature = require '../../feature.coffee'
    Profile = require '../../profile.coffee'
    Sale = require '../../sale.coffee'

    saleArtworks = new SaleArtworks [], id: @id
    artworks = new Artworks
    feature = new Feature
    profile = new Profile @get('profile')
    sale = new Sale @get('associated_sale')

    @__related__ =
      saleArtworks: saleArtworks
      artworks: artworks
      feature: feature
      profile: profile
      sale: sale
