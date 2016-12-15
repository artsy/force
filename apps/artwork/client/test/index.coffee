_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'Artwork Client', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @clientSetup = benv.requireWithJadeify require.resolve('../index.coffee'), ['fold', 'footer']
      done()

  after ->
    benv.teardown()

  describe 'setup', ->
    describe 'Auction', ->
      describe 'preview or open', ->
        beforeEach ->
          { @query, @variables, @init } = @clientSetup.setup __typename: 'ArtworkContextAuction', is_closed: false

        it 'formats query', ->
          @query.should.containEql('... partner')
          @query.should.containEql('... auction_artworks')
          @query.should.containEql('... artist_artworks')
          @query.should.containEql('... related_artworks')

        it 'sets variables', ->
          @variables.isClosed.should.not.be.true()

        it 'sets up initializers', ->
          @init.length.should.eql 2

      describe 'closed', ->
        beforeEach ->
          { @query, @variables, @init } = @clientSetup.setup __typename: 'ArtworkContextAuction', is_closed: true

        it 'formats query', ->
          @query.should.containEql('... partner')
          @query.should.containEql('... auction_artworks')
          @query.should.containEql('... artist_artworks')
          @query.should.containEql('... related_artworks')

        it 'sets variables', ->
          @variables.isClosed.should.be.true()

        it 'sets up initializers', ->
          @init.length.should.eql 3

    describe 'Fair', ->
      beforeEach ->
        { @query, @variables, @init } = @clientSetup.setup __typename: 'ArtworkContextFair'

      it 'formats query', ->
        @query.should.containEql('... fair_artworks')
        @query.should.containEql('... partner')
        @query.should.containEql('... artist_artworks')
        @query.should.containEql('... related_artworks')

      it 'sets up initializers', ->
        @init.length.should.eql 4

      xdescribe 'active', ->

      xdescribe 'not active', ->

    describe 'PartnerShow', ->
      beforeEach ->
        { @query, @variables, @init } = @clientSetup.setup __typename: 'ArtworkContextPartnerShow'

      it 'formats query', ->
        @query.should.containEql('... partner')
        @query.should.containEql('... show_artworks')
        @query.should.containEql('... artist_artworks')
        @query.should.containEql('... partner_artworks')
        @query.should.containEql('... related_artworks')

      it 'sets up initializers', ->
        @init.length.should.eql 5

    describe 'default', ->
      beforeEach ->
        { @query, @variables, @init } = @clientSetup.setup()

      it 'formats query', ->
        @query.should.containEql('... partner')
        @query.should.containEql('... artist_artworks')
        @query.should.containEql('... partner_artworks')
        @query.should.containEql('... related_artworks')

      it 'sets up initializers', ->
        @init.length.should.eql 4

  describe.only 'renderTemplates', ->
    beforeEach ->
      @data = artwork:
        sale_artwork: sale: {}, current_bid: {}, counts: {}
        partner:
          type: 'Gallery'
          name: 'Partner Name'
          href: '/partner-name'
          counts: { artworks: '2 works' }
          artworks: [{ id: 'artwork-1', partner: {}, image: { cell: {}, thumb: { height: 1 }}, title: 'Artwork 1'}]
        artist:
          name: 'Artwork Artist'
          href: '/artwork-artist'
          counts: { artworks: '2 works' }
          artworks: [{ id: 'artwork-2', partner: {}, image: { cell: {}, thumb: { height: 1 }}, title: 'Artwork 2'}]
        auction:
          name: 'Auction Name'
          href: '/auction-name'
          artworks: [{ id: 'artwork-3', sale_artwork: { sale: {}, current_bid: {}, counts: {} }, partner: {}, image: { cell: {}, thumb: { height: 1 }}, title: 'Artwork 3'}]
        show:
          type: 'Show'
          name: 'Some Show'
          href: '/some-show'
          counts: { artworks: '2 works' }
          artworks:  [{ id: 'artwork-4', partner: {}, image: { cell: {}, thumb: { height: 1 }}, title: 'Artwork 4'}]
      $('body').html("""
        <div class="artwork__main__overview__fold js-artwork-fold"></div>
        <div class="artwork__footer js-artwork-footer"></div>
      """)

    it 'renders data', ->
      @clientSetup.renderTemplates(@data)

      $('.artwork-section.artwork-partner').length.should.eql 1
      $('.artwork-section.artwork-partner').html().should.containEql 'Partner Name'

      $('.artwork-section.artwork-partner-artworks').length.should.eql 1
      $('.artwork-section.artwork-artist-artworks').length.should.eql 1
      $('.artwork-section.artwork-show-artworks').length.should.eql 1
      $('.artwork-section.artwork-auction-artworks').length.should.eql 1


      $('.artwork-section.artwork-partner-artworks').html().should.containEql 'Artwork 1'
      $('.artwork-section.artwork-partner-artworks').html().should.containEql 'Other Works from Partner Name'
      $('.artwork-section.artwork-partner-artworks').html().should.containEql 'View all 2 works from Partner Name'

      $('.artwork-section.artwork-artist-artworks').html().should.containEql 'Artwork 2'
      $('.artwork-section.artwork-artist-artworks').html().should.containEql 'Other Works by Artwork Artist'
      $('.artwork-section.artwork-artist-artworks').html().should.containEql 'View all 2 works by Artwork Artist'

      $('.artwork-section.artwork-auction-artworks').html().should.containEql 'Artwork 3'
      $('.artwork-section.artwork-auction-artworks').html().should.containEql '/auction-name'
      $('.artwork-section.artwork-auction-artworks').html().should.containEql 'Other Works from the Auction'

      $('.artwork-section.artwork-show-artworks').html().should.containEql 'Artwork 4'
      $('.artwork-section.artwork-show-artworks').html().should.containEql '/some-show'
      $('.artwork-section.artwork-show-artworks').html().should.containEql 'Other Works from the Show'
