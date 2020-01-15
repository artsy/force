_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Artworks = require '../../collections/artworks'

describe 'Artworks', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artworks = new Artworks [fabricate 'artwork']

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'attaches to artwork collection its a part of if passed in', ->
      as = new Artworks [{ id: 'foo' }], artworkCollection: 'foo'
      as.first().collection.artworkCollection.should.equal 'foo'

    it 'sets total count on sync', ->
      @artworks.trigger 'sync', null, null, { xhr: { getResponseHeader: -> 90 }}
      @artworks.totalCount.should.equal 90

  describe '#fillwidthDimensions', ->

    it 'maps the artworks into a dimensions array for fillwidth', ->
      @artworks.reset [fabricate 'artwork', images: [{
        original_width: 100
        original_height: 200
        aspect_ratio: 0.7
      }]]
      @artworks.fillwidthDimensions(260)[0].width.should.equal 182
      @artworks.fillwidthDimensions(260)[0].height.should.equal 260

  describe '#groupByColumnsInOrder', ->

    it 'groups models into an array of columns for rendering by the artwork columns component', ->
      _.times 14, => @artworks.add fabricate 'artwork'
      @artworks.length.should.equal 15
      columns = @artworks.groupByColumnsInOrder(3)
      columns.should.have.lengthOf 3
      for column in columns
        column.should.have.lengthOf 5
      columns[0][0].get('id').should.equal @artworks.first().get('id')
      columns[1][0].get('id').should.equal @artworks.at(1).get('id')
      columns[2][0].get('id').should.equal @artworks.at(2).get('id')

  describe '@fromSale', ->

    it "returns sale info injected in artworks", ->
      artworks = Artworks.fromSale new Backbone.Collection [{
        artwork: fabricate 'artwork'
        user_notes: "The vomit on this canvas is truely exquisit."
      }]
      artworks.first().related().saleArtwork.get('user_notes').should.containEql 'vomit'

    it 'sets the current bid', ->
      artworks = Artworks.fromSale new Backbone.Collection [{
        artwork: fabricate 'artwork'
        display_highest_bid_amount_dollars: '$10'
      }]
      artworks.first().related().saleArtwork.currentBid().should.containEql '$10'

  describe '#hasAny', ->
    it 'returns true if any artworks have a blurb', ->
      @artworks.hasAny('blurb').should.be.false()
      @artworks.first().set 'blurb', 'Existence!'
      @artworks.hasAny('blurb').should.be.true()

  describe '#maxBlurbHeight', ->
    it 'returns a pixel value based on the estimated height of the longest blurb', ->
      @artworks.maxBlurbHeight(true).should.equal '26px' # A single line
      _.isUndefined(@artworks.maxBlurbHeight(false)).should.be.true()
      @artworks.first().set 'blurb', 'Existence!'
      @artworks.maxBlurbHeight(true).should.equal '31px'
      @artworks.last().set 'blurb', 'Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence!'
      @artworks.maxBlurbHeight(true).should.equal '82px'
