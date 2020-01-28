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

  describe '@fromSale', ->

    it "returns sale info inject in artworks", ->
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
