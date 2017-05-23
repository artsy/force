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

    it 'fetches related auction artworks', (done) ->
      @fetchArtworkBuckets.__set__ 'ARTWORK',
        context:
          __typename: 'ArtworkContextAuction'
          is_open: true

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
            artworks: [
              fabricate 'artwork', {
                sale_artwork: lot_label: '24'
                sale: { sale_artwork: lot_label: '24' }
              }
            ]


      @fetchArtworkBuckets()

      @metaphysics.args[0][0].query.should.containEql 'sale'
      _.defer => _.defer =>
        @displayRelatedWorks.args[0][0][0].title.should.equal 'Other Works from the Auction'
        @displayRelatedWorks.args[0][0][0].typeName.should.equal 'ArtworkContextAuction'
        done()

    it 'fetches related fair artworks', (done) ->
      @fetchArtworkBuckets.__set__ 'ARTWORK',
        context:
          __typename: 'ArtworkContextFair'

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
              fabricate 'artwork', {title: '#BlackLivesMatter'}
            ]
          ]

      @fetchArtworkBuckets()

      @metaphysics.args[0][0].query.should.containEql 'show'
      _.defer => _.defer =>
        @displayRelatedWorks.args[0][0][0].title.should.equal 'Other Works from the Booth'
        @displayRelatedWorks.args[0][0][0].typeName.should.equal 'ArtworkContextFair'
        done()

    it 'fetches related show artworks', (done) ->
      @fetchArtworkBuckets.__set__ 'ARTWORK',
        context:
          __typename: 'ArtworkContextPartnerShow'
          is_active: true

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
        @displayRelatedWorks.args[0][0][0].title.should.equal 'Other Works from the Show'
        @displayRelatedWorks.args[0][0][0].typeName.should.equal 'ArtworkContextPartnerShow'
        done()

    xit 'fetches related partner and related artworks', (done) ->
      @fetchArtworkBuckets.__set__ 'ARTWORK', {}

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
        @displayRelatedWorks.args[0][0][1].title.should.equal 'Other Works from Pace Gallery'
        @displayRelatedWorks.args[0][0][1].typeName.should.equal 'gallery'
        @displayRelatedWorks.args[0][0][2].title.should.equal 'Related Works'
        @displayRelatedWorks.args[0][0][2].typeName.should.equal 'related'
        done()
