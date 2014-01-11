_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artworks = require '../../collections/artworks'

describe 'Artworks', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artworks = new Artworks [fabricate 'artwork']

  afterEach ->
    Backbone.sync.restore()

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
