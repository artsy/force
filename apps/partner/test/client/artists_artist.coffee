Backbone       = require 'backbone'
sinon          = require 'sinon'
PartnerArtists = require '../../../../collections/partner_artists.coffee'
PartnerArtist  = require '../../../../models/partner_artist.coffee'
Artworks       = require '../../../../collections/artworks.coffee'
_              = require 'underscore'
benv           = require 'benv'
{ resolve }    = require 'path'
{ fabricate }  = require 'antigravity'
rewire         = require 'rewire'

PartnerArtistsArtistView = rewire '../../client/artists_artist'

describe 'PartnerArtistsArtistView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      benv.render resolve(__dirname, '../../templates/artists_artist.jade'), { artist: { get: -> } }, =>
        @template = sinon.stub()
        PartnerArtistsArtistView.__set__ 'template', @template

        # stub the Artworks fetch
        @Artworks = sinon.stub()
        @Artworks.returns (@artworks = new Artworks())
        PartnerArtistsArtistView.__set__ 'Artworks', @Artworks

        # stub the ArtworkColumnsView
        @ArtworkColumnsView = sinon.stub()
        PartnerArtistsArtistView.__set__ 'ArtworkColumnsView', @ArtworkColumnsView

        @partnerArtist = new PartnerArtist fabricate('partner_artist')
        done()

  afterEach -> benv.teardown()

  describe '#fetchArtworks', ->

    it 'renders the artwork column and not calls the noArtworks callback if there are artworks', ->
      sinon.stub @artworks, 'fetch', (options) =>
        @artworks.add fabricate('artwork')
        options?.success?()
      noArtworks = sinon.stub()

      new PartnerArtistsArtistView
        model: @partnerArtist
        el: $ 'body'
        noArtworks: noArtworks

      @ArtworkColumnsView.calledOnce.should.be.ok
      noArtworks.called.should.not.be.ok

    it 'calls the noArtworks callback if empty artworks retrieved', ->
      sinon.stub @artworks, 'fetch', (options) -> options?.success?()
      noArtworks = sinon.stub()

      new PartnerArtistsArtistView
        model: @partnerArtist
        el: $ 'body'
        noArtworks: noArtworks

      noArtworks.calledOnce.should.be.ok
