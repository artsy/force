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
artworkWithClosedAuction = require './fixtures/artwork_closed_auction'
# andy-warhol-skull
artworkWithOpenAuction = require './fixtures/artwork_open_auction'
ArtworkRails = rewire '../artwork_rails'

describe 'ArtworkRails', ->

  before ->
    @tenArtworks = -> [
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

    @tenSaleArtworks = -> [
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

  describe 'filtering rails', ->
    before ->
      @rails = [
        { id: 'show_artworks', collection: [fabricate('artwork', _id: 'cat'), fabricate('artwork', _id: 'dog')] }
        { id: 'for_sale_artworks', collection: [fabricate('artwork', _id: 'cat'), fabricate('artwork', _id: 'cat2')] }
      ]

    it 'makes rails unique', () ->
      filteredRails = new ArtworkRails(id: 'imacat').filter(@rails)
      _.findWhere(filteredRails, id: 'for_sale_artworks').collection.should.have.lengthOf 1   # cat filtered out, only cat2 left

  describe 'with an artwork that has a show',  ->
    beforeEach ->
      ArtworkRails.__set__ 'metaphysics', ->
        Q.promise (resolve, reject) ->
          return resolve artworkWithShow

      @rails = new ArtworkRails id: 'joaquin-torres-garcia-autorretrato-self-portrait'

      sinon.stub Backbone, 'sync'
        .onCall 0
        .yieldsTo 'success', hits: @tenArtworks()
        .onCall 1
        .yieldsTo 'success', hits: @tenArtworks()
        .onCall 2
        .yieldsTo 'success', @tenArtworks()
        .onCall 3
        .yieldsTo 'success', hits: @tenArtworks()

    afterEach ->
      Backbone.sync.restore()

    it 'tries to fetch similar artworks, artist artworks, show artworks and partner artworks', (done) ->
      @rails.fetch().then ->
        _.map Backbone.sync.args, (args) -> _.result args[1], 'url'
        .should.eql [
          'undefined/api/v1/filter/artworks'
          'undefined/api/v1/filter/artworks'
          'undefined/api/v1/partner/museum-of-modern-art/show/museum-of-modern-art-joaquin-torres-garcia-the-arcadian-modern/artworks?published=true'
          'undefined/api/v1/filter/artworks'
        ]
        done()
      .catch done

    it 'requests with the proper parameters', (done) ->
      @rails.fetch().then ->
        data = _.map Backbone.sync.args, (args) -> qs.parse(args[2].data)
        # similar
        data[0].gene_id.should.eql 'painting'
        data[0].size.should.eql '21'
        # artist
        data[1].artist_id.should.eql 'joaquin-torres-garcia'
        data[1].size.should.eql '31'
        # show
        data[2].size.should.eql 41
        # partner
        data[3].partner_id.should.eql 'museum-of-modern-art'
        data[3].size.should.eql '61'
        done()
      .catch done

    it 'returns artwork and all valid rails', (done) ->
      @rails.fetch().then (response) ->
        response.artwork._id.should.eql '5669a995a09a67218b00009c'
        _.keys(response.rails).length.should.eql 4
        _.keys(response.rails)[0].should.eql 'similar_artworks'
        done()
      .catch done

  describe 'with an artwork that has an open auction', ->
    beforeEach ->
      ArtworkRails.__set__ 'metaphysics', ->
        Q.promise (resolve, reject) ->
          return resolve artworkWithOpenAuction

      @rails = new ArtworkRails id: 'john-evans-american-born-1932-daily-collages-march-april-1981'

      sinon.stub Backbone, 'sync'

    afterEach ->
      Backbone.sync.restore()

    it 'doesnt fetch anything', (done) ->
      @rails.fetch().then ->
        Backbone.sync.args.should.eql []
        done()

  describe 'with an artwork that has a closed auction',  ->
    beforeEach ->
      ArtworkRails.__set__ 'metaphysics', ->
        Q.promise (resolve, reject) ->
          return resolve artworkWithClosedAuction

      @rails = new ArtworkRails id: 'john-evans-american-born-1932-daily-collages-march-april-1981'

      sinon.stub Backbone, 'sync'
        .onCall 0
        .yieldsTo 'success', @tenSaleArtworks()
        .onCall 1
        .yieldsTo 'success', hits: @tenArtworks()
        .onCall 2
        .yieldsTo 'success', hits: @tenArtworks()
        .onCall 3
        .yieldsTo 'success', hits: @tenArtworks()

    afterEach ->
      Backbone.sync.restore()

    it 'tries to fetch auction artworks, similar artworks, artist artworks, and partner artworks', (done) ->
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
        data[1].gene_id.should.eql 'print'
        data[1].size.should.eql '21'
        # artist
        data[2].artist_id.should.eql 'ed-ruscha'
        data[2].size.should.eql '31'
        # partner
        data[3].partner_id.should.eql 'los-angeles-modern-auctions-lama'
        data[3].size.should.eql '61'
        done()
      .catch done

    it 'returns artwork and all valid rails', (done) ->
      @rails.fetch().then (response) ->
        response.artwork._id.should.eql '54c2f01972616916df110900'
        _.keys(response.rails).length.should.eql 4
        _.keys(response.rails)[0].should.eql 'closed_auction_artworks'
        done()
      .catch done

  describe 'with an artwork that has an auction and no similar works',  ->
    beforeEach ->
      ArtworkRails.__set__ 'metaphysics', ->
        Q.promise (resolve, reject) ->
          return resolve artworkWithClosedAuction

      @rails = new ArtworkRails id: 'john-evans-american-born-1932-daily-collages-march-april-1981'

      sinon.stub Backbone, 'sync'
        # auction fetch
        .onCall 0
        .yieldsTo 'success', @tenSaleArtworks()
        # similar fetch
        .onCall 1
        .yieldsTo 'success', null
        .onCall 2
        .yieldsTo 'success', hits: @tenArtworks()
        .onCall 3
        .yieldsTo 'success', hits: @tenArtworks()
        .onCall 4
        .yieldsTo 'success', hits: @tenArtworks()


    afterEach ->
      Backbone.sync.restore()

    it 'returns artwork and all valid rails (without similar_artworks)', (done) ->
      @rails.fetch().then (response) ->
        response.artwork._id.should.eql '54c2f01972616916df110900'
        _.keys(response.rails).length.should.eql 3
        _.keys(response.rails)[0].should.eql 'closed_auction_artworks'
        _.keys(response.rails)[1].should.eql 'artist_artworks'
        done()
      .catch done


  describe 'with an artwork that is not for sale',  ->
    beforeEach ->
      ArtworkRails.__set__ 'metaphysics', ->
        Q.promise (resolve, reject) ->
          notForSaleArtwork = _.clone artworkWithShow
          notForSaleArtwork.artwork.is_for_sale = false
          return resolve notForSaleArtwork

      @rails = new ArtworkRails id: 'joaquin-torres-garcia-autorretrato-self-portrait'

      sinon.stub Backbone, 'sync'
        .onCall 0
        .yieldsTo 'success', hits: @tenArtworks()
        .onCall 1
        .yieldsTo 'success', hits: @tenArtworks()
        .onCall 2
        .yieldsTo 'success', @tenArtworks()
        .onCall 3
        .yieldsTo 'success', hits: @tenArtworks()
        .onCall 4
        .yieldsTo 'success', hits: @tenArtworks()

    afterEach ->
      Backbone.sync.restore()

    it 'tries to fetch similar artworks, artist artworks, show artworks, for sale artworks and partner artworks', (done) ->
      @rails.fetch().then ->
        _.map Backbone.sync.args, (args) -> _.result args[1], 'url'
        .should.eql [
          'undefined/api/v1/filter/artworks'
          'undefined/api/v1/filter/artworks'
          'undefined/api/v1/partner/museum-of-modern-art/show/museum-of-modern-art-joaquin-torres-garcia-the-arcadian-modern/artworks?published=true'
          'undefined/api/v1/filter/artworks'
          'undefined/api/v1/filter/artworks'
        ]
        done()
      .catch done

    it 'returns artwork and all valid rails', (done) ->
      @rails.fetch().then (response) ->
        response.artwork._id.should.eql '5669a995a09a67218b00009c'
        _.keys(response.rails).length.should.eql 5
        _.keys(response.rails)[0].should.eql 'similar_artworks'
        done()
      .catch done


