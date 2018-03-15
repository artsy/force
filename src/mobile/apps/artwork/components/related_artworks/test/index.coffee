_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artworks = require '../../../../../collections/artworks'
Q = require 'bluebird-q'


describe 'Related Artworks', ->

  describe 'fetchArtworkBuckets', ->
    beforeEach (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'
        Backbone.$ = $

        @fetchArtworkBuckets = rewire '../'
        @fetchArtworkBuckets.__set__ 'metaphysics', @metaphysics = sinon.stub()
        @fetchArtworkBuckets.__set__ 'displayRelatedWorks', @displayRelatedWorks = sinon.stub()

        done()

    afterEach ->
      benv.teardown()

    it 'fetches related auction artworks ONLY if the auction is open', (done) ->
      @fetchArtworkBuckets.__set__ 'ARTWORK',
        context:
          __typename: 'ArtworkContextAuction'
          is_open: true
        artist:
          href: 'artsy.net/artist/artist1'
          counts:
            artworks: 12
        partner:
          href: 'artsy.net/partner/partner1'
          counts:
            artworks: 56


      @metaphysics.returns Q.resolve
        artwork:
          artist:
            name: 'Fela Kuti'
            href: '/fela-kuti'
            artworks: [
              fabricate 'artwork'
            ]
          sale:
            is_open: true
            href: 'artsy.net/auction/sale1'
            eligible_sale_artworks_count: 40
            artworks: [
              fabricate 'artwork', {
                sale_artwork: lot_label: '24'
                sale: { sale_artwork: lot_label: '24' }
              }
            ]


      @fetchArtworkBuckets()

      @metaphysics.args[0][0].query.should.containEql 'sale'
      _.defer => _.defer =>
        @displayRelatedWorks.args[0][0].length.should.equal(1)

        @displayRelatedWorks.args[0][0][0].title.should.equal 'Other Works from the Auction'
        @displayRelatedWorks.args[0][0][0].typeName.should.equal 'ArtworkContextAuction'
        @displayRelatedWorks.args[0][0][0].href.should.equal 'artsy.net/auction/sale1'
        @displayRelatedWorks.args[0][0][0].totalCount.should.equal 40
        done()

    it 'fetches artist artworks and related artworks if the sale is closed', (done) ->
      @fetchArtworkBuckets.__set__ 'ARTWORK',
        context:
          __typename: 'ArtworkContextAuction'
          is_open: false
        artist:
          href: 'artsy.net/artist/artist1'
          counts:
            artworks: 12
        partner:
          href: 'artsy.net/partner/partner1'
          counts:
            artworks: 56


      @metaphysics.returns Q.resolve
        artwork:
          artist:
            name: 'Fela Kuti'
            href: '/fela-kuti'
            artworks: [
              fabricate 'artwork'
            ]
          sale:
            is_open: true
            href: 'artsy.net/auction/sale1'
            eligible_sale_artworks_count: 40
            artworks: [
              fabricate 'artwork', {
                sale_artwork: lot_label: '24'
                sale: { sale_artwork: lot_label: '24' }
              }
            ]


      @fetchArtworkBuckets()

      @metaphysics.args[0][0].query.should.containEql 'sale'
      _.defer => _.defer =>
        @displayRelatedWorks.args[0][0].length.should.equal(2)

        @displayRelatedWorks.args[0][0][0].title.should.equal 'Other Works by Fela Kuti'
        @displayRelatedWorks.args[0][0][0].href.should.equal 'artsy.net/artist/artist1'
        @displayRelatedWorks.args[0][0][0].totalCount.should.equal 12

        @displayRelatedWorks.args[0][0][1].title.should.equal 'Related Works'
        @displayRelatedWorks.args[0][0][1].isRelated.should.equal true
        done()

    it 'fetches related fair artworks', (done) ->
      @fetchArtworkBuckets.__set__ 'ARTWORK',
        context:
          __typename: 'ArtworkContextFair'
        artist:
          href: 'artsy.net/artist/artist1'
          counts:
            artworks: 12
        partner:
          href: 'artsy.net/partner/partner1'
          counts:
            artworks: 56

      @metaphysics.returns Q.resolve
        artwork:
          artist:
            name: 'Fela Kuti'
            href: '/fela-kuti'
            artworks: [
              fabricate 'artwork'
            ]
          partner:
            name: 'Happy Gallery'
          shows:[
            artworks: [
              fabricate 'artwork', {title: '#BlackLivesMatter'}
            ]
          ]

      @fetchArtworkBuckets()

      @metaphysics.args[0][0].query.should.containEql 'show'
      _.defer => _.defer =>
        @displayRelatedWorks.args[0][0].length.should.equal(4)

        @displayRelatedWorks.args[0][0][0].title.should.equal 'Other Works from the Booth'
        @displayRelatedWorks.args[0][0][0].typeName.should.equal 'ArtworkContextFair'

        @displayRelatedWorks.args[0][0][1].title.should.equal 'Other Works by Fela Kuti'
        @displayRelatedWorks.args[0][0][1].href.should.equal 'artsy.net/artist/artist1'
        @displayRelatedWorks.args[0][0][1].totalCount.should.equal 12

        @displayRelatedWorks.args[0][0][2].title.should.equal 'Other Works from Happy Gallery'
        @displayRelatedWorks.args[0][0][2].href.should.equal 'artsy.net/partner/partner1'
        @displayRelatedWorks.args[0][0][2].totalCount.should.equal 56

        @displayRelatedWorks.args[0][0][3].title.should.equal 'Related Works'
        @displayRelatedWorks.args[0][0][3].isRelated.should.equal true
        done()

    it 'fetches related show artworks', (done) ->
      @fetchArtworkBuckets.__set__ 'ARTWORK',
        context:
          __typename: 'ArtworkContextPartnerShow'
          is_active: true
        artist:
          href: 'artsy.net/artist/artist1'
          counts:
            artworks: 12
        partner:
          href: 'artsy.net/partner/partner1'
          counts:
            artworks: 56

      @metaphysics.returns Q.resolve
        artwork:
          artist:
            name: 'Fela Kuti'
            href: '/fela-kuti'
            artworks: [
              fabricate 'artwork'
            ]
          shows:[
            artworks: [
              fabricate 'artwork'
            ]
          ]
          partner:
            name: 'Pace Gallery'
            href: '/pace-gallery'
            count:
              artworks: '205'
            artworks: [
              fabricate 'artwork'
            ]

      @fetchArtworkBuckets()

      @metaphysics.args[0][0].query.should.containEql 'shows'
      _.defer => _.defer =>
        @displayRelatedWorks.args[0][0].length.should.equal(4)

        @displayRelatedWorks.args[0][0][0].title.should.equal 'Other Works from the Show'
        @displayRelatedWorks.args[0][0][0].typeName.should.equal 'ArtworkContextPartnerShow'

        @displayRelatedWorks.args[0][0][1].title.should.equal 'Other Works by Fela Kuti'
        @displayRelatedWorks.args[0][0][1].href.should.equal 'artsy.net/artist/artist1'
        @displayRelatedWorks.args[0][0][1].totalCount.should.equal 12

        @displayRelatedWorks.args[0][0][2].title.should.equal 'Other Works from Pace Gallery'
        @displayRelatedWorks.args[0][0][2].href.should.equal 'artsy.net/partner/partner1'
        @displayRelatedWorks.args[0][0][2].totalCount.should.equal 56

        @displayRelatedWorks.args[0][0][3].title.should.equal 'Related Works'
        @displayRelatedWorks.args[0][0][3].isRelated.should.equal true
        done()

    it 'fetches related partner and related artworks', (done) ->
      @fetchArtworkBuckets.__set__ 'ARTWORK',
        artist:
          href: 'artsy.net/artist/artist1'
          counts:
            artworks: 12
        partner:
          href: 'artsy.net/partner/partner1'
          counts:
            artworks: 56

      @metaphysics.returns Q.resolve
        artwork:
          artist:
            name: 'Fela Kuti'
            href: '/fela-kuti'
            artworks: [
              fabricate 'artwork'
            ]
          partner:
            name: 'Pace Gallery'
            href: '/pace-gallery'
            count:
              artworks: '205'
            artworks: [
              fabricate 'artwork'
            ]
          layer:
            name: 'Most Similar'
            artworks: [
              fabricate 'artwork'
            ]

      @fetchArtworkBuckets()

      @metaphysics.args[0][0].query.should.containEql 'partner'
      @metaphysics.args[0][0].query.should.containEql 'layer'
      _.defer => _.defer =>
        @displayRelatedWorks.args[0][0].length.should.equal(3)

        @displayRelatedWorks.args[0][0][0].title.should.equal 'Other Works by Fela Kuti'
        @displayRelatedWorks.args[0][0][0].href.should.equal 'artsy.net/artist/artist1'
        @displayRelatedWorks.args[0][0][0].totalCount.should.equal 12

        @displayRelatedWorks.args[0][0][1].title.should.equal 'Other Works from Pace Gallery'
        @displayRelatedWorks.args[0][0][1].typeName.should.equal 'gallery'
        @displayRelatedWorks.args[0][0][1].totalCount.should.equal 56

        @displayRelatedWorks.args[0][0][2].title.should.equal 'Related Works'
        @displayRelatedWorks.args[0][0][2].typeName.should.equal 'related'
        done()
