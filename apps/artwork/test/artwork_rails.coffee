_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
Q = require 'bluebird-q'
qs = require 'qs'
{ fabricate } = require 'antigravity'
# joaquin-torres-garcia-autorretrato-self-portrait
artworkWithShow = require './fixtures/artwork_with_show'
# ed-ruscha-pearl-dust-combination-from-insects-portfolio
artworkWithAuction = require './fixtures/artwork_open_auction'
ArtworkRails = rewire '../artwork_rails'

describe 'ArtworkRails', ->

  before ->
    @tenArtworks = [
      fabricate 'artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'artwork', _id: _.uniqueId(), id: _.uniqueId()
    ]

    @tenSaleArtworks = [
      fabricate 'sale_artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'sale_artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'sale_artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'sale_artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'sale_artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'sale_artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'sale_artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'sale_artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'sale_artwork', _id: _.uniqueId(), id: _.uniqueId()
      fabricate 'sale_artwork', _id: _.uniqueId(), id: _.uniqueId()
    ]

  describe 'with an artwork that has a show',  ->
    before ->
      ArtworkRails.__set__ 'metaphysics', ->
        Q.promise (resolve, reject) ->
          return resolve artworkWithShow

      @rails = new ArtworkRails id: 'joaquin-torres-garcia-autorretrato-self-portrait'

      @rails.fetchAuctionArtworks = ->
        Q.promise (resolve, reject) ->
          return resolve()

      sinon.stub Backbone, 'sync'
        .yieldsTo 'success', hits: @tenArtworks
        .onCall 0
        .yieldsTo 'success', hits: @tenArtworks

    after ->
      Backbone.sync.restore()

    it 'tries to fetch show artworks, similar artworks, artist artworks, and partner artworks', (done) ->
      @rails.fetch().then ->
        _.map Backbone.sync.args, (args) -> _.result args[1], 'url'
        .should.eql [
          'undefined/api/v1/filter/artworks'
          'undefined/api/v1/filter/artworks'
          'undefined/api/v1/partner/museum-of-modern-art/show/museum-of-modern-art-joaquin-torres-garcia-the-arcadian-modern/artworks?published=true',
          'undefined/api/v1/filter/artworks'
        ]
        done()
      .catch done

    it 'requests with the proper parameters, and exclude already fetched artworks', (done) ->
      @rails.fetch().then ->
        data = _.map Backbone.sync.args, (args) -> qs.parse(args[2].data)
        # similar
        data[0].exclude_artwork_ids.length.should.eql 1
        data[0].gene_id.should.eql 'painting'
        data[0].size.should.eql '20'
        # artist
        data[1].artist_id.should.eql 'joaquin-torres-garcia'
        data[1].size.should.eql '10'
        data[1].exclude_artwork_ids.length.should.eql 11
        # show
        data[3].partner_id.should.eql 'museum-of-modern-art'
        data[3].size.should.eql '10'
        data[3].exclude_artwork_ids.length.should.eql 21
        done()
      .catch done

    it 'returns artwork and all valid rails', (done) ->
      @rails.fetch().then (response) ->
        response.artwork._id.should.eql '5669a995a09a67218b00009c'
        _.keys(response.rails).length.should.eql 4
        _.keys(response.rails)[0].should.eql 'similar_artworks'
        done()
      .catch done

  describe 'with an artwork that has an auction',  ->
    before ->
      ArtworkRails.__set__ 'metaphysics', ->
        Q.promise (resolve, reject) ->
          return resolve artworkWithAuction

      @rails = new ArtworkRails id: 'john-evans-american-born-1932-daily-collages-march-april-1981'

      sinon.stub Backbone, 'sync'
        .yieldsTo 'success', hits: @tenArtworks
        .onCall 0
        # auction fetch
        .yieldsTo 'success', @tenSaleArtworks

    after ->
      Backbone.sync.restore()

    it 'tries to fetch show artworks, similar artworks, artist artworks, and partner artworks', (done) ->
      @rails.fetch().then ->
        _.map Backbone.sync.args, (args) -> _.result args[1], 'url'
        .should.eql [
          'undefined/api/v1/sale/los-angeles-modern-auctions-march-2015/sale_artworks',
          'undefined/api/v1/filter/artworks'
          'undefined/api/v1/filter/artworks'
          'undefined/api/v1/filter/artworks'
        ]
        done()
      .catch done

    it 'requests with the proper parameters, and exclude already fetched artworks', (done) ->
      @rails.fetch().then (response)->
        data = _.map Backbone.sync.args, (args) -> qs.parse(args[2].data)
        # similar
        data[1].exclude_artwork_ids.length.should.eql 1
        data[1].gene_id.should.eql 'print'
        data[1].size.should.eql '20'
        # artist
        data[2].artist_id.should.eql 'ed-ruscha'
        data[2].size.should.eql '10'
        data[2].exclude_artwork_ids.length.should.eql 11
        # partner
        data[3].partner_id.should.eql 'los-angeles-modern-auctions-lama'
        data[3].size.should.eql '10'
        data[3].exclude_artwork_ids.length.should.eql 21
        done()
      .catch done

    it 'returns artwork and all valid rails', (done) ->
      @rails.fetch().then (response) ->
        response.artwork._id.should.eql '54c2f01972616916df110900'
        _.keys(response.rails).length.should.eql 4
        _.keys(response.rails)[0].should.eql 'current_auction_artworks'
        done()
      .catch done

  describe 'with an artwork that has an auction and no similar works',  ->
    before ->
      ArtworkRails.__set__ 'metaphysics', ->
        Q.promise (resolve, reject) ->
          return resolve artworkWithAuction

      @rails = new ArtworkRails id: 'john-evans-american-born-1932-daily-collages-march-april-1981'

      sinon.stub Backbone, 'sync'
        # auction fetch
        .onCall 0
        .yieldsTo 'success', @tenSaleArtworks
        # similar fetch
        .onCall 1
        .yieldsTo 'success', null
        .onCall 2
        .yieldsTo 'success', hits: @tenArtworks
        .onCall 3
        .yieldsTo 'success', hits: @tenArtworks
        .onCall 4
        .yieldsTo 'success', hits: @tenArtworks


    after ->
      Backbone.sync.restore()

    it 'returns artwork and all valid rails (without similar_artworks)', (done) ->
      @rails.fetch().then (response) ->
        response.artwork._id.should.eql '54c2f01972616916df110900'
        _.keys(response.rails).length.should.eql 3
        _.keys(response.rails)[0].should.eql 'current_auction_artworks'
        _.keys(response.rails)[1].should.eql 'artist_artworks'
        done()
      .catch done


