Backbone = require 'backbone'
sinon = require 'sinon'
PartnerArtists = require '../../../../collections/partner_artists.coffee'
PartnerArtist = require '../../../../models/partner_artist.coffee'
PartnerArtistArtworks = require '../../../../collections/partner_artist_artworks.coffee'
_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
rewire = require 'rewire'

PartnerArtistsArtistView = benv.requireWithJadeify require.resolve('../../client/artists_artist'), ['template']

describe 'PartnerArtistsArtistView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $

      # stub the Artworks fetch
      @PartnerArtistArtworks = sinon.stub()
      @PartnerArtistArtworks.returns (@artworks = new PartnerArtistArtworks())
      PartnerArtistsArtistView.__set__ 'PartnerArtistArtworks', @PartnerArtistArtworks

      # stub the ArtworkColumnsView
      @artworkColumnsView = { appendArtworks: sinon.stub() }
      @ArtworkColumnsView = sinon.stub()
      @ArtworkColumnsView.returns @artworkColumnsView
      PartnerArtistsArtistView.__set__ 'ArtworkColumnsView', @ArtworkColumnsView

      # stub the BlurbView
      PartnerArtistsArtistView.__set__ 'BlurbView', sinon.stub()

      @partnerArtist = new PartnerArtist fabricate('partner_artist')

      # artworks
      @artistArtworks = [
        { artwork: fabricate 'artwork', id: 'artwork1' },
        { artwork: fabricate 'artwork', id: 'artwork2' },
        { artwork: fabricate 'artwork', id: 'artwork3' },
        { artwork: fabricate 'artwork', id: 'artwork4' },
        { artwork: fabricate 'artwork', id: 'artwork5' },
        { artwork: fabricate 'artwork', id: 'artwork6' },
        { artwork: fabricate 'artwork', id: 'artwork7' }
      ]
      done()

  afterEach -> benv.teardown()

  describe '#initializeBio', ->
    beforeEach ->
      sinon.stub @artworks, 'fetch', (options) -> options?.success?()
      @view = new PartnerArtistsArtistView
        model: @partnerArtist
        el: $ 'body'
        noArtworks: sinon.stub()

    it 'renders the Artsy artist bio if use_default_biography', ->
      @view.partnerArtist.set use_default_biography: true
      @view.artist.set blurb: 'artsy bio'
      @view.initializeBio()
      @view.$('.partner2-artist-blurb').html().should.containEql 'artsy bio'

    it 'renders the partner provided artist bio if not use_default_biography', ->
      @view.partnerArtist.set use_default_biography: false, biography: 'partner provided bio'
      @view.initializeBio()
      @view.$('.partner2-artist-blurb').html().should.containEql '<p>partner provided bio'
      @view.$('.partner2-artist-blurb-postfix').html().should.containEql "Submitted by #{@partnerArtist.get('partner').name}"

    it 'does not render the attribution line if not use_default_biography and blank provided artist bio', ->
      @view.partnerArtist.set use_default_biography: false, biography: '   '
      @view.initializeBio()
      @view.$('.partner2-artist-blurb').html().should.be.empty()
      @view.$('.partner2-artist-blurb-postfix').should.have.length 0

  describe '#fetchNextPageArtworks', ->

    it 'renders the artwork column and not calls the noArtworks callback if there are artworks', ->
      sinon.stub @artworks, 'fetch', (options) =>
        @artworks.add fabricate('artwork')
        options?.success?()
      noArtworks = sinon.stub()

      new PartnerArtistsArtistView
        model: @partnerArtist
        el: $ 'body'
        noArtworks: noArtworks

      @ArtworkColumnsView.calledOnce.should.be.ok()
      noArtworks.called.should.not.be.ok()

    it 'calls the noArtworks callback if empty artworks retrieved', ->
      sinon.stub @artworks, 'fetch', (options) -> options?.success?()
      noArtworks = sinon.stub()

      new PartnerArtistsArtistView
        model: @partnerArtist
        el: $ 'body'
        noArtworks: noArtworks

      noArtworks.calledOnce.should.be.ok()

    it 'renders all artworks of the artist with infinite scrolling', ->

      sinon.stub @artworks, 'fetch', (options) =>
        start = (options.data.page - 1) * options.data.size
        end = start + options.data.size
        @artworks.reset()
        @artworks.add @artistArtworks[start...end]
        options.success?()

      view = new PartnerArtistsArtistView
        model: @partnerArtist
        el: $ 'body'
        pageSize: 2
        allArtworks: true

      @ArtworkColumnsView.calledOnce.should.be.ok()
      view.nextPage.should.equal 2

      view.fetchNextPageArtworks()
      view.nextPage.should.equal 3
      artworks = _.last(@artworkColumnsView.appendArtworks.args)[0]
      artworks.length.should.equal 2
      artworks[0].get('artwork').id.should.equal 'artwork3'
      artworks[1].get('artwork').id.should.equal 'artwork4'

      view.fetchNextPageArtworks()
      view.nextPage.should.equal 4
      artworks = _.last(@artworkColumnsView.appendArtworks.args)[0]
      artworks.length.should.equal 2
      artworks[0].get('artwork').id.should.equal 'artwork5'
      artworks[1].get('artwork').id.should.equal 'artwork6'

      view.fetchNextPageArtworks()
      view.nextPage.should.equal 5
      artworks = _.last(@artworkColumnsView.appendArtworks.args)[0]
      artworks.length.should.equal 1
      artworks[0].get('artwork').id.should.equal 'artwork7'
