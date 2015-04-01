Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artworks = require '../../collections/artworks'
PartnerArtistArtworks = require '../../collections/partner_artist_artworks'

describe 'PartnerArtistArtworks', ->

  beforeEach ->
    @artwork = fabricate 'artwork'
    @partner_artist_artwork = { artwork: @artwork, partner_artist: fabricate('artist'), position: 1 }
    @artworks = new Artworks [@artwork]
    @partner_artist_artworks = new PartnerArtistArtworks [@partner_artist_artworks]

  describe '#serialize', ->

    it 'plucks artworks from the PartnerArtistArtwork resluts', ->
      @partner_artist_artworks.first.should.equal @artworks.first

