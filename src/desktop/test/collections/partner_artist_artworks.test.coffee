Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Artworks = require '../../collections/artworks'
PartnerArtistArtworks = require '../../collections/partner_artist_artworks'

describe 'PartnerArtistArtworks', ->

  beforeEach ->
    @artwork = fabricate 'artwork'
    @partnerArtistArtwork = { artwork: @artwork, partner_artist: fabricate('artist'), position: 1 }
    @artworks = new Artworks [@artwork]
    @partnerArtistArtworks = new PartnerArtistArtworks [@partnerArtistArtwork]

  describe '#serialize', ->

    it 'plucks artworks from the PartnerArtistArtwork results', ->
      @partnerArtistArtworks.first().get('artwork').id.should.equal @artworks.first().get('id')


