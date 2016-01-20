_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
Q = require 'bluebird-q'
qs = require 'qs'
{ fabricate } = require 'antigravity'
# joaquin-torres-garcia-autorretrato-self-portrait
artworkWithShow = require './fixtures/artwork_with_show'
# pierre-bonnard-bords-de-seine-a-vernon
artworkWithShowAndGallery = require './fixtures/artwork_with_show_and_gallery'
# ed-ruscha-pearl-dust-combination-from-insects-portfolio
artworkWithAuction = require './fixtures/artwork_open_auction'
ArtworkRails = rewire '../artwork_rails'

describe 'ArtworkRails, with show', ->
  beforeEach ->
    tenArtworks = [
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
    ArtworkRails.__set__ 'metaphysics', ->
      Q.promise (resolve, reject) ->
        return resolve artworkWithShow

    @rails = new ArtworkRails id: 'joaquin-torres-garcia-autorretrato-self-portrait'

    @rails.fetchAuctionArtworks = ->
      Q.promise (resolve, reject) ->
        return resolve()

    sinon.stub Backbone, 'sync'
      .yieldsTo 'success', tenArtworks

  afterEach ->
    Backbone.sync.restore()

  it 'fetches show artworks, similar artworks, artist artworks, and partner artworks', (done) ->
    @rails.fetch().then ->
      _.map Backbone.sync.args, (args) -> _.result args[1], 'url'
      .should.eql [
        'undefined/api/v1/partner/museum-of-modern-art/show/museum-of-modern-art-joaquin-torres-garcia-the-arcadian-modern/artworks?published=true',
        'undefined/api/v1/filter/artworks'
        'undefined/api/v1/filter/artworks'
        'undefined/api/v1/filter/artworks'
      ]
      done()
    .catch done

  it 'requests with the proper parameters, and exclude already fetched artworks', (done) ->
    @rails.fetch().then ->
      data = _.map Backbone.sync.args, (args) -> qs.parse(args[2].data)
      # similar
      data[1].exclude_artwork_ids.length.should.eql 11
      data[1].gene_id.should.eql 'painting'
      data[1].size.should.eql '20'
      # artist
      data[2].artist_id.should.eql 'joaquin-torres-garcia'
      data[2].size.should.eql '10'
      # show
      data[3].partner_id.should.eql 'museum-of-modern-art'
      data[3].size.should.eql '10'
      done()
    .catch done

  it 'returns artwork and all valid rails', (done) ->
    @rails.fetch().then (response) ->
      # should only return 1 rail, as all other rails will have had excluded ids'
      response.artwork._id.should.eql '5669a995a09a67218b00009c'
      _.keys(response.rails).length.should.eql 1
      done()
    .catch done

describe 'ArtworkRails, with auction', ->
  beforeEach ->
    tenArtworks = [
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
    ArtworkRails.__set__ 'metaphysics', ->
      Q.promise (resolve, reject) ->
        return resolve artworkWithAuction

    @rails = new ArtworkRails id: 'john-evans-american-born-1932-daily-collages-march-april-1981'

    sinon.stub Backbone, 'sync'
      .yieldsTo 'success', tenArtworks

  afterEach ->
    Backbone.sync.restore()

  it 'fetches show artworks, similar artworks, artist artworks, and partner artworks', (done) ->
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
      data[1].exclude_artwork_ids.length.should.eql 11
      data[1].gene_id.should.eql 'painting'
      data[1].size.should.eql '20'
      # artist
      data[2].artist_id.should.eql 'joaquin-torres-garcia'
      data[2].size.should.eql '10'
      # show
      data[3].partner_id.should.eql 'museum-of-modern-art'
      data[3].size.should.eql '10'
      done()
    .catch done
