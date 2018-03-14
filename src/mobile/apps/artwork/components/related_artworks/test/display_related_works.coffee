_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artworks = require '../../../../../collections/artworks'

describe 'Render Related Artworks', ->

  describe 'displayRelatedWorks', ->
    beforeEach (done) ->
      benv.setup =>
        benv.expose
          $: benv.require 'jquery'
          sd: { ARTWORK: fabricate('artwork', {
            artist:
              counts:
                artworks: 148
          }) }
        Backbone.$ = $

        { @displayRelatedWorks } = benv.requireWithJadeify require.resolve('../display_related_works'), ['template', 'artworkColumnsTemplate']
        $('body').html "<div class='artwork-related-artworks'></div>"

        done()


    afterEach ->
      benv.teardown()

    it 'render related auction artworks', ->
      artwork1 = fabricate 'artwork', {
        sale_artwork: lot_label: '24'
        sale: { sale_artwork: lot_label: '24' }
      }
      artwork2 = fabricate 'artwork'
      artwork3 = fabricate 'artwork', title: 'Funkadelic'

      relatedWorks = [
        {
          collection: new Artworks([ artwork1, artwork2 ]),
          title: 'Other Works from the Auction',
          typeName: 'ArtworkContextAuction'
        },
        {
          collection: new Artworks([ artwork2 ]),
          title: 'Other Works by Fela Kuti',
          typeName: 'artist',
          isArtist: true
        },
        {
          collection: new Artworks([ artwork1, artwork3 ]),
          title: 'Related Works',
          typeName: 'related'
        }
      ]

      context = { __typename: 'ArtworkContextAuction', is_open: true }

      @displayRelatedWorks(relatedWorks, context)

      $('.artwork-related-artworks .artwork-related-artworks-module__section-title').first().text().should.equal 'Other Works from the Auction'
      $('.artwork-columns-artwork-details__auction-lot-number').first().text().should.equal 'Lot 24'
      $('.artwork-related-artworks .artwork-related-artworks-module__section-title').last().text().should.equal 'Related Works'
      $('.artwork-related-artworks-module__related-artworks-list[data-artworks=related] .artwork-columns-artwork-details em').last().text().should.equal 'Funkadelic'

    it 'render related show artworks', ->
      artwork1 = fabricate 'artwork', {
        title: 'Dale'
        artist:
          name: 'Pitbull'
      }
      artwork2 = fabricate 'artwork'

      relatedWorks = [
        {
          collection: new Artworks([ artwork1, artwork2 ]),
          title: 'Other Works from the Show',
          typeName: 'ArtworkContextPartnerShow'
        },
        {
          collection: new Artworks([ artwork2 ]),
          title: 'Other Works by Andy Warhol',
          typeName: 'artist',
          isArtist: true
        }
      ]

      context = { __typename: 'ArtworkContextPartnerShow', is_active: true }

      @displayRelatedWorks(relatedWorks, context)

      $('.artwork-related-artworks .artwork-related-artworks-module__section-title').first().text().should.equal 'Other Works from the Show'
      $('.artwork-columns-artwork-details').first().text().should.containEql 'Dale'
      $('.artwork-columns-artwork-details').first().text().should.containEql 'Pitbull'
      $('.artwork-related-artworks-module__related-artworks-list[data-artworks=ArtworkContextPartnerShow] .artwork-columns-artwork-details em').first().text().should.equal 'Dale'

    it 'render related partner artworks', ->
      artwork1 = fabricate 'artwork', {
        partner:
          name: 'Funky'
        collecting_institution: null
        title: 'Groove is in the heart'
      }

      relatedWorks = [
        {
          collection: new Artworks([ artwork1 ]),
          title: 'Other Works from Funky',
          typeName: 'gallery'
        }
      ]

      context = { }

      @displayRelatedWorks(relatedWorks, context)

      $('.artwork-related-artworks .artwork-related-artworks-module__section-title').first().text().should.equal 'Other Works from Funky'
      $('.artwork-columns-artwork-details em').first().text().should.equal 'Groove is in the heart'
      $('.artwork-columns-artwork-details').first().text().should.containEql 'Funky'
