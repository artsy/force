module.exports =
  related: ->
    return @__related__ if @__related__?

    { SaleArtworks } = require '../../../collections/sale_artworks'
    { Artworks } = require '../../../collections/artworks'
    Profile = require '../../profile.coffee'
    Sale = require '../../sale.coffee'

    saleArtworks = new SaleArtworks [], id: @id
    artworks = new Artworks
    profile = new Profile @get('profile')
    sale = new Sale @get('associated_sale')

    @__related__ =
      saleArtworks: saleArtworks
      artworks: artworks
      profile: profile
      sale: sale
